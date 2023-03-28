function updateSearch() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var myObj = JSON.parse(this.responseText);
    // This is where I can use the JSON object.

    // console.log(myObj);

    fillSearchResults(myObj);
  };
  xhttp.open("GET", link);
  xhttp.send();
}

var link = "recipes/recipes.json"; // "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json";

function fillSearchResults(jsonObject) {
  const resultsDiv = document.getElementById("search-results");
  const searchInput = document.getElementById("search-input").value;
  const tagsInput = document.getElementById("tags-filter").value;
  const timeInput = parseInt(document.getElementById("time-filter").value);
  var group3 = {};
  var group2 = {};
  var group1 = {};
  var group0 = {};
  for (let recipeid in jsonObject.recipes) {
    let recipe = jsonObject.recipes[recipeid];
    let points = 0;
    if (
      recipe.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      !searchInput
    ) {
      points++;
    }
    if (recipe.tags.includes(tagsInput) || tagsInput == "#all#") {
      points++;
    }
    if (timeInput >= recipe.prepTime + recipe.cookTime) {
      points++;
    }
    switch (points) {
      case 3:
        group3[recipeid] = recipe;
        break;
      case 2:
        group2[recipeid] = recipe;
        break;
      case 1:
        group1[recipeid] = recipe;
        break;
      default:
        group0[recipeid] = recipe;
        break;
    }
  }
  htmlString = "";
  htmlString = addToHtmlString(htmlString, group3);
  // if (!htmlString) {
  //   htmlString += `<div class="search-divider">More results</div>`;
  // }
  htmlString += `<div class="search-divider">Similar Results</div>`;
  htmlString = addToHtmlString(htmlString, group2);
  htmlString = addToHtmlString(htmlString, group1);
  resultsDiv.innerHTML = htmlString;
}

function addToHtmlString(string, group) {
  for (let recipeid in group) {
    let recipe = group[recipeid];
    string += `<div class="search-result"><img src="images/recipe/${recipeid}.png" alt="${
      recipe.name
    }" /><p>${recipe.name}</p><p>Tags: ${recipe.tags.join(
      ", "
    )}</p><p>Prep Time: ${recipe.prepTime}<br />Cook Time: ${
      recipe.cookTime
    }</p></div>`;
  }
  return string;
}

window.addEventListener("load", updateSearch());
