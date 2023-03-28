import json


def getDataFromUser():
    name = input("Name: ")

    description = input("Description: ")

    isFavorite = True if input("Is favorite? y/n: ") == "y" else False

    tags = []
    word = input("Tags (press enter on blank to move on):\n> ").lower()

    while True:
        if word == "":
            break
        tags.append(word)
        word = input("> ").lower()

    difficulty = input("Difficulty ('easy', 'intermediate', 'professional'): ").lower()

    prepTime = int(input("Prep Time (minutes): "))

    cookTime = int(input("Cook Time (minutes): "))

    source = input("Source: ")

    ingredients = []

    print("INGREDIENTS")

    while True:
        try:
            quantity = int(input("Quantity (press enter on blank to move on): "))
        except:
            break

        if not quantity:
            break

        measurement = input("Measurement: ").lower()

        ingredient = input("Ingredient Name: ")

        ingredients.append(
            {"quantity": quantity, "measurement": measurement, "ingredient": ingredient}
        )

    directions = []
    word = input("Directions (press enter on blank to move on):\n> ").lower()

    while True:
        if word == "":
            break
        directions.append(word)
        word = input("> ").lower()

    notes = []
    word = input("Notes (press enter on blank to move on):\n> ")

    while True:
        if word == "":
            break
        notes.append(word)
        word = input("> ").lower()

    recipeDict = {
        "name": name,
        "description": description,
        "isFavorite": isFavorite,
        "tags": tags,
        "difficulty": difficulty,
        "prepTime": prepTime,
        "cookTime": cookTime,
        "source": source,
        "ingredients": ingredients,
        "directions": directions,
        "notes": notes,
    }

    return recipeDict


recipeObject = getDataFromUser()

# print(object)

with open("recipes.json", "r") as f:
    data = json.load(f)

# print(data)
# print(type(data))
# print(len(data))
# print(len(data["recipes"]))

recipeid = str(len(data["recipes"]))
data["recipes"][recipeid] = recipeObject

print(data)

with open("recipes.json", "w") as f:
    json.dump(data, f, indent=2)
