from typing import TypedDict

from langgraph.graph import StateGraph, END

from app.inventory import sort_by_expiry
from app.agents import recipe_agent


class RecipeState(TypedDict):
    ingredients: list[str]
    expiry_days: list[int]
    sorted_ingredients: list[str]
    inventory_context: str
    recipe: dict


# Inventory Node
def inventory_node(state: RecipeState):

    sorted_ingredients, sorted_expiry_days = sort_by_expiry(
        state["ingredients"],
        state["expiry_days"]
    )

    state["sorted_ingredients"] = sorted_ingredients

    inventory_context = []

    for ingredient, days in zip(sorted_ingredients, sorted_expiry_days):

        if days < 0:
            status = "Expired ❌"
        elif days <= 3:
            status = f"Expires in {days} day(s) ⚠️"
        else:
            status = f"Expires in {days} day(s)"

        inventory_context.append(
            f"{ingredient} | {status}"
        )

    state["inventory_context"] = "\n".join(inventory_context)

    return state


# Recipe Generation Node
def recipe_node(state: RecipeState):

    state["recipe"] = recipe_agent(
        state["inventory_context"]
    )

    return state


# Build LangGraph Workflow
workflow = StateGraph(RecipeState)

workflow.add_node("inventory", inventory_node)
workflow.add_node("recipe", recipe_node)

workflow.set_entry_point("inventory")

workflow.add_edge("inventory", "recipe")
workflow.add_edge("recipe", END)

graph = workflow.compile()