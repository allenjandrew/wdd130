function updateSearch() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var myObj = JSON.parse(this.responseText);
    // This is where I can use the JSON object.

    // console.log(myObj);

    fillSearchResults(myObj);

    const thumbnails = document.getElementsByClassName("search-result");
    for (item of thumbnails) {
      item.onclick = function () {
        showModal();
        fillModal(this.dataset.recipeid, myObj);
      };
    }
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
    string += `<div class="search-result" data-recipeid="${recipeid}"><img src="images/recipe/${recipeid}.png" alt="${
      recipe.name
    }" /><p>${recipe.name}</p><p>Tags: ${recipe.tags.join(
      ", "
    )}</p><p>Prep Time: ${recipe.prepTime}<br />Cook Time: ${
      recipe.cookTime
    }</p></div>`;
  }
  return string;
}

function fillModal(recipeid, jsonObject) {
  let recipe = jsonObject.recipes[recipeid];
  let funTag = recipe.isFavorite
    ? "Favorites"
    : recipeid > Object.keys(jsonObject.recipes).length - 5
    ? "Recently Uploaded"
    : "Recipes";

  let htmlString = `<h1>${recipe.name}</h1><p>Tags: ${recipe.tags.join(
    ", "
  )}</p><div class=recipe-stats><div><p>${funTag}</p></div><div><p>Difficulty: ${
    recipe.difficulty
  }</p></div><div><p>Prep Time: ${
    recipe.prepTime
  } mins</p></div><div><p>Cook Time: ${
    recipe.cookTime
  } mins</p></div></div><p>${recipe.description}</p><p>From: ${
    recipe.source
  }</p><img src="images/recipe/${recipeid}.png" alt="${
    recipe.name
  }" /><br><label for="multiplier">Ingredient multiplier: </label><select id="select-multiplier" name="multiplier"><option value="1" selected>1x</option><option value="1.5">1.5x</option><option value="2">2x</option><option value="3">3x</option><option value="4">4x</option><option value="5">5x</option><option value="6">6x</option></select><h2>Ingredients</h2><ul id="ingredients-list">`;
  for (ingred of recipe.ingredients) {
    htmlString += `<li>${ingred.quantity ? ingred.quantity : ""} ${
      ingred.measurement ? ingred.measurement : ""
    } ${ingred.ingredient}</li>`;
  }
  htmlString += `</ul><h2>Directions</h2><ol id="directions-list">`;
  for (direc of recipe.directions) {
    htmlString += `<li>${direc}</li>`;
  }
  htmlString += `</ol>`;
  if (recipe.notes.length) {
    htmlString += `<h3>Notes</h3><ul id="notes-list">`;
    for (note of recipe.notes) {
      htmlString += `<li>${note}</li>`;
    }
    htmlString += `</ul>`;
  }
  modalDiv.innerHTML = htmlString;

  document
    .getElementById("select-multiplier")
    .addEventListener("change", () => {
      let multiplier = document.getElementById("select-multiplier").value;
      let multipliedIngredHTML = ``;
      for (ingred of recipe.ingredients) {
        multipliedIngredHTML += `<li>${
          ingred.quantity ? ingred.quantity * multiplier : ""
        } ${ingred.measurement ? ingred.measurement : ""} ${
          ingred.ingredient
        }</li>`;
      }
      document.getElementById("ingredients-list").innerHTML =
        multipliedIngredHTML;
    });
}

var modal = document.getElementById("myModal");
var modalDiv = document.getElementById("modal-content");

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  modal.style.height = "0";
  modal.style.width = "0";
  modal.style.left = "50%";
  modal.style.borderRadius = "10px";
  closeButton.style.display = "none";
  document.body.classList.remove("noscroll");
});

function showModal() {
  modal.style.height = "calc(100% - 100px)";
  modal.style.width = "100%";
  modal.style.left = "0";
  modal.style.borderRadius = "0";
  modal.scrollTop = "0";
  closeButton.style.display = "block";
  document.body.classList.add("noscroll");
}

window.addEventListener("load", updateSearch());
