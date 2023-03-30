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

    while True:
        difficulty = input(
            "Difficulty ('easy', 'intermediate', 'professional'): "
        ).lower()
        if difficulty in ["easy", "intermediate", "professional"]:
            break
        print("Please enter 'easy', 'intermediate', or 'professional'")

    prepTime = int(input("Prep Time (minutes): "))

    cookTime = int(input("Cook Time (minutes): "))

    source = input("Source: ")

    ingredients = []
    print("INGREDIENTS")

    while True:
        iput = input("Quantity (press enter on blank to move on): ")

        if iput in ["null", "none", "empty", "blank"]:
            quantity = None
            measurement = None
        elif not iput:
            break
        else:
            try:
                quantity = float(iput)
            except:
                print("Enter a number or 'null'")
                continue

            measurement = input("Measurement: ").lower()

        ingredient = input("Ingredient Name: ")

        ingredients.append(
            {"quantity": quantity, "measurement": measurement, "ingredient": ingredient}
        )

    directions = []
    word = input("Directions (press enter on blank to move on):\n> ")

    while True:
        if word == "":
            break
        directions.append(word)
        word = input("> ")

    notes = []
    word = input("Notes (press enter on blank to move on):\n> ")

    while True:
        if word == "":
            break
        notes.append(word)
        word = input("> ")

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


with open("recipes.json", "r") as f:
    data = json.load(f)

# print(data)
# print(type(data))
# print(len(data))
# print(len(data["recipes"]))

while True:
    recipeObject = getDataFromUser()

    # print(object)

    recipeid = str(len(data["recipes"]))
    data["recipes"][recipeid] = recipeObject

    if input("Add another recipe? y/n: ").lower() != "y":
        break

print(data)

if input("Upload recipes? y/n: ").lower() == "y":
    with open("recipes.json", "w") as f:
        json.dump(data, f, indent=2)
