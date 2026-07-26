def sort_by_expiry(ingredients, expiry_days):
    """
    Sort ingredients based on expiry days.
    Lower expiry days come first.
    Returns both sorted ingredients and sorted expiry days.
    """

    paired_data = list(zip(ingredients, expiry_days))

    paired_data.sort(key=lambda x: x[1])

    sorted_ingredients = [item[0] for item in paired_data]
    sorted_expiry_days = [item[1] for item in paired_data]

    return sorted_ingredients, sorted_expiry_days