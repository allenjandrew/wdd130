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
        modal.style.display = "block";
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

// Get the modal
var modal = document.getElementById("myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
var widgets = document.getElementsByClassName("widget");
var modalDiv = document.getElementById("modal-div");
// for (item of widgets) {
//   item.onclick = function () {
//     modal.style.display = "block";
//     modalDiv.innerHTML = this.innerHTML;
//   };
// }
// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
closeButton.onclick = function () {
  modal.style.display = "none";
};

fromLink = "recipes/recipes.json"; // "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json";
window.addEventListener("load", usingJSON(fromLink));
