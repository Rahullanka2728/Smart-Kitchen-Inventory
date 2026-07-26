import requests

BASE_URL = "http://<BACKEND_IP>:8080/api"
# Example:
# BASE_URL = "http://192.168.1.15:8080/api"

EMAIL = "ganesh@gmail.com"
PASSWORD = "ganesh123"


def login():
    """
    Login to backend and return JWT token.
    """

    url = f"{BASE_URL}/users/login"

    params = {
        "email": EMAIL,
        "password": PASSWORD
    }

    response = requests.post(url, params=params)

    response.raise_for_status()

    return response.json()
if __name__ == "__main__":
    print(login())