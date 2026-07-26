# 🍽️ Recipe AI - GenAI Service

AI-powered Recipe Generation Service for the Smart Kitchen Inventory System.

---

# Features

- Fetches inventory directly from PostgreSQL
- Prioritizes ingredients based on expiry dates
- Recipe generation using LangGraph
- LLM integration using Google Gemini
- AI recipe image generation
- Automatic upload of recipe images to AWS S3
- Stores generated recipes in the `recipes` table
- Stores generation history in the `ai_recipe_history` table
- Uses the same Recipe ID in both database tables
- Returns structured JSON response with recipe details and image URL

---

# Tech Stack

- Python
- FastAPI
- LangChain
- LangGraph
- Google Gemini API
- PostgreSQL
- AWS S3
- Pollinations AI (Image Generation)

---

# Project Structure

```
app/
│
├── agents.py
├── backend_api.py
├── database.py
├── database_service.py
├── graph.py
├── image_generator.py
├── inventory.py
├── llm.py
├── main.py
├── prompts.py
├── recipe_history.py
├── routes.py
├── s3_upload.py
├── schemas.py
```

---

# Workflow

1. Fetch inventory from PostgreSQL.
2. Sort inventory based on nearest expiry.
3. LangGraph prepares inventory context.
4. Google Gemini generates a recipe.
5. AI generates recipe image.
6. Image uploads to AWS S3.
7. Recipe is stored in the `recipes` table.
8. Recipe history is stored in the `ai_recipe_history` table using the same Recipe ID.
9. API returns the generated recipe with image URL.

---

# API Endpoint

## Generate Recipe

**POST**

```
/generate-recipe
```

### Request

> Inventory is automatically fetched from PostgreSQL.
> The request body is currently ignored but is required by Swagger.

```json
{
  "ingredients": [],
  "expiry_days": []
}
```

---

### Example Response

```json
{
  "recipe_name": "Paneer Tomato Fried Rice",
  "ingredients": [
    {
      "name": "Paneer",
      "quantity": "200g"
    },
    {
      "name": "Tomato",
      "quantity": "2"
    }
  ],
  "steps": [
    "Step 1",
    "Step 2"
  ],
  "preparation_time": "20 minutes",
  "difficulty": "Easy",
  "servings": "4",
  "nutrition": {
    "calories": "420",
    "protein": "20g",
    "carbohydrates": "60g",
    "fat": "15g"
  },
  "cooking_tips": [
    "Use day-old rice."
  ],
  "image_prompt": "...",
  "image_url": "https://bucket-name.s3.ap-south-1.amazonaws.com/recipes/paneer_fried_rice.png"
}
```

---

# Environment Variables

Create a `.env` file from `.env.example`.

```env
GEMINI_API_KEY=your_gemini_api_key

DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_database_password

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=food-inventory-sync-2026
```

---

# Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Run

```bash
uvicorn app.main:app --reload
```

---

# Swagger

```
http://127.0.0.1:8000/docs
```

---

# GenAI Components

- LangGraph Workflow
- Inventory Prioritization
- Prompt Engineering
- Google Gemini Integration
- JSON Structured Output
- AI Image Generation
- AWS S3 Upload
- PostgreSQL Integration
- Recipe History Storage

---

# Database Integration

The service stores generated recipes in two tables:

### recipes

Stores:

- Recipe ID
- Recipe Name
- Difficulty
- Cooking Time
- Servings
- Instructions
- Image URL
- Created Timestamp

### ai_recipe_history

Stores:

- Same Recipe ID
- Prompt
- Available Ingredients
- Generated Recipe JSON
- AI Model
- Cooking Time
- Servings
- Generated Timestamp

Both tables share the **same Recipe ID**.

---

# Image Storage

Recipe images are uploaded to AWS S3 inside:

```
recipes/
```

Generated filename format:

```
recipe_name_randomid.png
```

Example:

```
recipes/paneer_tomato_fried_rice_c1bdb4d8.png
```

---

# Developed By

**GenAI Module**