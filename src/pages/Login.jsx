import styled from "styled-components";
import bg from "../assets/login-bg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  // Mode: "login" or "register"
  const [mode, setMode] = useState("login");

  // Login States
  const [loginInput, setLoginInput] = useState(""); // Email or Phone
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8080/api/users";

  // ===================================
  // Handle Register (Sign In / Sign Up)
  // ===================================
  const handleRegister = async () => {
    setError("");
    setSuccessMsg("");

    if (!firstName.trim() || !lastName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError("Please fill in all required fields (First Name, Last Name, Email, Password).");
      return;
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      phoneNumber: regPhone.trim(),
      role: "MANAGER",
      status: "ACTIVE",
    };

    try {
      setLoading(true);
      // Attempt backend API registration
      let registeredUser = null;
      try {
        const res = await axios.post(`${API_URL}/register`, payload);
        registeredUser = res.data;
      } catch (backendErr) {
        console.warn("Backend register API failed, saving locally:", backendErr);
      }

      // Save user to LocalStorage fallback list
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const userToSave = registeredUser || { ...payload, id: Date.now() };

      // Check if email already registered locally
      if (existingUsers.some((u) => u.email.toLowerCase() === regEmail.toLowerCase())) {
        setError("Email already registered! Please login.");
        setLoading(false);
        return;
      }

      existingUsers.push(userToSave);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      toast.success("Account created successfully! Please login.");
      setSuccessMsg("Registration successful! You can now log in.");

      // Pre-fill login input with registered email and switch to login tab
      setLoginInput(regEmail);
      setLoginPassword(regPassword);
      setTimeout(() => {
        setMode("login");
        setError("");
        setSuccessMsg("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ===================================
  // Handle Login
  // ===================================
  const handleLogin = async () => {
    setError("");
    setSuccessMsg("");

    const input = loginInput.trim();
    const pass = loginPassword.trim();

    if (!input || !pass) {
      setError("Please enter your Email/Phone and Password.");
      return;
    }

    try {
      setLoading(true);

      // 1. Try Backend API Login
      try {
        const res = await axios.post(`${API_URL}/login?email=${encodeURIComponent(input)}&password=${encodeURIComponent(pass)}`);
        if (res.data && res.data.id) {
          toast.success(`Welcome, ${res.data.firstName || "User"}!`);
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          navigate("/dashboard");
          return;
        }
      } catch (apiErr) {
        console.warn("Backend direct login endpoint check failed, checking users list:", apiErr);
      }

      // 2. Try Backend All Users search (matching email or phone number)
      try {
        const usersRes = await axios.get(API_URL);
        if (Array.isArray(usersRes.data)) {
          const found = usersRes.data.find(
            (u) =>
              (u.email?.toLowerCase() === input.toLowerCase() || u.phoneNumber === input) &&
              u.password === pass
          );
          if (found) {
            toast.success(`Welcome back, ${found.firstName || "User"}!`);
            localStorage.setItem("currentUser", JSON.stringify(found));
            navigate("/dashboard");
            return;
          }
        }
      } catch (listErr) {
        console.warn("Backend user fetch error:", listErr);
      }

      // 3. Check LocalStorage fallback registered users
      const localUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const localFound = localUsers.find(
        (u) =>
          (u.email?.toLowerCase() === input.toLowerCase() || u.phoneNumber === input) &&
          u.password === pass
      );

      if (localFound) {
        toast.success(`Welcome back, ${localFound.firstName || "User"}!`);
        localStorage.setItem("currentUser", JSON.stringify(localFound));
        navigate("/dashboard");
        return;
      }

      // If no credentials match
      setError("Invalid Email/Phone or Password.");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Overlay>
        <LoginBox>
          <Logo>🍽</Logo>
          <Title>Smart Kitchen</Title>
          <SubTitle>Restaurant Management System</SubTitle>

          {/* Mode Switcher Tabs */}
          <TabContainer>
            <Tab
              $active={mode === "login"}
              onClick={() => {
                setMode("login");
                setError("");
                setSuccessMsg("");
              }}
            >
              🔑 Login
            </Tab>
            <Tab
              $active={mode === "register"}
              onClick={() => {
                setMode("register");
                setError("");
                setSuccessMsg("");
              }}
            >
              📝 Sign Up (Register)
            </Tab>
          </TabContainer>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <Input
                type="text"
                placeholder="Email Address or Phone Number"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
              />

              <Input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <ShowPassword onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? "🙈 Hide Password" : "👁 Show Password"}
              </ShowPassword>

              <Options>
                <Remember>
                  <input type="checkbox" defaultChecked />
                  Remember Me
                </Remember>
                <ForgotPassword>Forgot Password?</ForgotPassword>
              </Options>

              {error && <ErrorText>{error}</ErrorText>}
              {successMsg && <SuccessText>{successMsg}</SuccessText>}

              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login →"}
              </Button>
            </>
          )}

          {/* REGISTER (SIGN IN) FORM */}
          {mode === "register" && (
            <>
              <Row>
                <Input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Row>

              <Input
                type="email"
                placeholder="Email Address *"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />

              <Input
                type="text"
                placeholder="Phone Number"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
              />

              <Input
                type={showRegPassword ? "text" : "password"}
                placeholder="Password *"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />

              <ShowPassword onClick={() => setShowRegPassword(!showRegPassword)}>
                {showRegPassword ? "🙈 Hide Password" : "👁 Show Password"}
              </ShowPassword>

              {error && <ErrorText>{error}</ErrorText>}
              {successMsg && <SuccessText>{successMsg}</SuccessText>}

              <Button onClick={handleRegister} disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up / Register →"}
              </Button>
            </>
          )}
        </LoginBox>
      </Overlay>
    </Container>
  );
}

export default Login;

// ===================================
// Styled Components
// ===================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  padding: 20px 0;
`;

const LoginBox = styled.div`
  width: 460px;
  padding: 40px;
  border-radius: 22px;
  background: rgba(20, 20, 20, 0.72);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
`;

const Logo = styled.div`
  font-size: 55px;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #22c55e;
  font-size: 34px;
  margin: 8px 0;
  font-weight: 800;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #d8d8d8;
  margin-bottom: 24px;
  font-size: 14px;
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 22px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#22c55e" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#cbd5e1")};
  box-shadow: none;
  transition: all 0.25s ease;

  &:hover {
    color: white;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #555;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 15px;
  outline: none;
  box-shadow: none;
  transition: 0.3s;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    border: 1px solid #22c55e;
    box-shadow: none;
  }
`;

const ShowPassword = styled.p`
  color: #22c55e;
  text-align: right;
  cursor: pointer;
  font-size: 13px;
  margin-top: -6px;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const Remember = styled.label`
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ForgotPassword = styled.p`
  color: #22c55e;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: #ff5d5d;
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
`;

const SuccessText = styled.p`
  color: #22c55e;
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background: #22c55e;
  box-shadow: none;
  transition: 0.3s;

  &:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;