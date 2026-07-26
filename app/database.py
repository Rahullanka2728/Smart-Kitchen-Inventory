import psycopg2

connection = psycopg2.connect(
    host="food-inventory-db.crcawkq2aeeg.ap-south-1.rds.amazonaws.com",
    port=5432,
    database="postgres",
    user="postgres",
    password="FoodInventory2026"
)

cursor = connection.cursor()

# Recipes table
cursor.execute("""
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name='recipes'
""")

print("\n===== RECIPES TABLE =====")
for row in cursor.fetchall():
    print(row)

# AI Recipe History table
cursor.execute("""
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name='ai_recipe_history'
""")

print("\n===== AI RECIPE HISTORY TABLE =====")
for row in cursor.fetchall():
    print(row)

cursor.close()
connection.close()
