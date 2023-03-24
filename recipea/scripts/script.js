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

    console.log(myObj);
    fillFaveWidget(myObj);

    thumbnails = document.getElementsByClassName("recipe-thumbnail");
    for (item of thumbnails) {
      item.onclick = function () {
        showModal();
        let recipe = myObj.recipes[this.dataset.recipeid];
        modalDiv.innerHTML = JSON.stringify(recipe);
      };
    }
  };
  xhttp.open("GET", link);
  xhttp.send();
}

function fillFaveWidget(json) {
  var htmlString = "";
  for (key in json.recipes) {
    let value = json.recipes[key];
    if (value.isFavorite) {
      htmlString += `<div class="recipe-thumbnail" data-recipeid="${key}"><h3 class="thumbnail-name">${
        value.name
      }</h3><img class="thumbnail-img" src="images/recipe/${key}.png" alt="${
        value.name
      }"/><p class="thumbnail-source">From: ${
        value.source
      }</p><p class="thumbnail-tags">${value.tags.join(", ")}</p></div>`;
    }
  }
  document.querySelector("#fave-results").innerHTML = htmlString;
}

var modal = document.getElementById("myModal");
var widgets = document.getElementsByClassName("widget");
var modalDiv = document.getElementById("modal-content");
function showModal() {
  modal.style.height = "calc(100% - 100px)";
  modal.style.width = "100%";
  modal.style.left = "0";
  modal.style.borderRadius = "0";
  closeButton.style.display = "block";
}
// for (item of widgets) {
//   item.onclick = function () {
//     modal.style.display = "block";
//     modalDiv.innerHTML = this.innerHTML;
//   };
// }

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  modal.style.height = "0";
  modal.style.width = "0";
  modal.style.left = "50%";
  modal.style.borderRadius = "10px";
  closeButton.style.display = "none";
});

fromLink = "recipes/recipes.json"; // "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json";
window.addEventListener("load", usingJSON(fromLink));
