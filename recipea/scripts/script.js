function setResults() {
  const faveResults = document.querySelector("#fave-results");
  faveResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
  const reupResults = document.querySelector("#reup-results");
  reupResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
  const reviResults = document.querySelector("#revi-results");
  reviResults.innerHTML = `<div>Result1</div><div>Result2</div><div>Result3</div>`;
}

window.addEventListener("load", loadRecipesJSON());

// document.getElementById("infl").addEventListener("change", function () {
//   var file_reader = new FileReader();
//   file_reader.onload = function () {
//     document.getElementById("res").textContent = file_reader.result;
//   };
//   file_reader.readAsText(this.files[0]);
// });

function loadRecipesJSON() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    myObj = JSON.parse(this.responseText);
    console.log(myObj);
    fillFaveWidget(myObj);
  };
  xhttp.open(
    "GET",
    "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json"
  );
  xhttp.send();
}

function fillFaveWidget(json) {
  var htmlString = "";
  for (item of json.recipes) {
    if (item.isFavorite) {
      htmlString += `<div><h3>${item.name}</h3><p>${
        item.source
      }</p><p>${item.tags.join(", ")}</p></div>`;
    }
  }
  document.querySelector("#fave-results").innerHTML = htmlString;
}
