import psycopg2
from datetime import date

# PostgreSQL Connection
connection = psycopg2.connect(
    host="food-inventory-db.crcawkq2aeeg.ap-south-1.rds.amazonaws.com",
    port=5432,
    database="postgres",
    user="postgres",
    password="FoodInventory2026"
)


def get_inventory_for_ai():
    """
    Fetch inventory from PostgreSQL
    and prepare it for LangGraph.
    """

    cursor = connection.cursor()

    query = """
    SELECT
        ing.ingredient_name,
        inv.available_quantity,
        inv.unit,
        inv.expiry_date
    FROM inventory inv
    JOIN ingredients ing
    ON inv.ingredient_id = ing.id
    """

    cursor.execute(query)

    rows = cursor.fetchall()

    cursor.close()

    ingredients = []
    expiry_days = []

    today = date.today()

    for row in rows:

        ingredient_name = row[0]
        quantity = row[1]
        unit = row[2]
        expiry = row[3]

        ingredients.append(
            f"{ingredient_name} ({quantity} {unit})"
        )

        if expiry is not None:
            days = (expiry - today).days
        else:
            days = 999

        expiry_days.append(days)

    return ingredients, expiry_days


if __name__ == "__main__":

    try:

        ingredients, expiry_days = get_inventory_for_ai()

        print("\n========== INGREDIENTS ==========")

        for item in ingredients:
            print(item)

        print("\n========== EXPIRY DAYS ==========")

        print(expiry_days)

    except Exception as e:

        print("\nDatabase Error")
        print(e)