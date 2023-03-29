function setResults() {
  const faveResults = document.querySelector("#fave-results");
  faveResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
  const reupResults = document.querySelector("#reup-results");
  reupResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
  const reviResults = document.querySelector("#revi-results");
  reviResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
}

// document.getElementById("infl").addEventListener("change", function () {
//   var file_reader = new FileReader();
//   file_reader.onload = function () {
//     document.getElementById("res").textContent = file_reader.result;
//   };
//   file_reader.readAsText(this.files[0]);
// });

function usingJSON(link) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var myObj = JSON.parse(this.responseText);
    // This is where I can use the JSON object.

    // console.log(myObj);
    fillFaveWidget(myObj);
    fillReupWidget(myObj);

    // sendJSONData(myObj);

    const thumbnails = document.getElementsByClassName("recipe-thumbnail");
    for (item of thumbnails) {
      item.onclick = function () {
        showModal();
        fillModal(this.dataset.recipeid, myObj);
        // modalDiv.innerHTML = JSON.stringify(recipe);
      };
    }
  };
  xhttp.open("GET", link);
  xhttp.send();
}

function sendJSONData(jsonObject) {
  const xhttp2 = new XMLHttpRequest();
  const url = "/..";
  const jsonString = JSON.stringify(jsonObject);
  xhttp2.open("POST", url, true);
  xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp2.onload = function () {
    console.log(this.responseText);
  };
  xhttp2.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this);
      console.log(url, jsonString);
    }
  };
  xhttp2.send(jsonString);
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

function fillFaveWidget(jsonObject) {
  let htmlString = "";
  let recipesShown = widgetMaxRecipes;
  for (key in jsonObject.recipes) {
    let value = jsonObject.recipes[key];
    if (value.isFavorite && recipesShown) {
      htmlString += `<div class="recipe-thumbnail" data-recipeid="${key}"><h3 class="thumbnail-name">${
        value.name
      }</h3><img class="thumbnail-img" src="images/recipe/${key}.png" alt="${
        value.name
      }"/><p class="thumbnail-source">From: ${
        value.source
      }</p><p class="thumbnail-tags">${value.tags.join(", ")}</p></div>`;
      recipesShown--;
    }
  }
  document.querySelector("#fave-results").innerHTML = htmlString;
}

function fillReupWidget(jsonObject) {
  let htmlString = "";
  for (key in jsonObject.recipes) {
    let value = jsonObject.recipes[key];
    console.log(key);
    console.log(Object.keys(jsonObject.recipes).length);
    console.log(widgetMaxRecipes);
    if (key >= Object.keys(jsonObject.recipes).length - widgetMaxRecipes) {
      htmlString += `<div class="recipe-thumbnail" data-recipeid="${key}"><h3 class="thumbnail-name">${
        value.name
      }</h3><img class="thumbnail-img" src="images/recipe/${key}.png" alt="${
        value.name
      }"/><p class="thumbnail-source">From: ${
        value.source
      }</p><p class="thumbnail-tags">${value.tags.join(", ")}</p></div>`;
    }
  }
  document.querySelector("#reup-results").innerHTML = htmlString;
}

var modal = document.getElementById("myModal");
var widgets = document.getElementsByClassName("widget");
var modalDiv = document.getElementById("modal-content");
function showModal() {
  modal.style.height = "calc(100% - 100px)";
  modal.style.width = "100%";
  modal.style.left = "0";
  modal.style.borderRadius = "0";
  modal.scrollTop = "0";
  closeButton.style.display = "block";
  document.body.classList.add("noscroll");
}

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  modal.style.height = "0";
  modal.style.width = "0";
  modal.style.left = "50%";
  modal.style.borderRadius = "10px";
  closeButton.style.display = "none";
  document.body.classList.remove("noscroll");
});

var fromLink = "recipes/recipes.json"; // "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json";
var widgetMaxRecipes = 5;
window.addEventListener("load", usingJSON(fromLink));
