function updateSearch() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var myObj = JSON.parse(this.responseText);
    // This is where I can use the JSON object.

    // console.log(myObj);

    for (recipe of myObj.recipes) {
      return;
    }
  };
  xhttp.open("GET", link);
  xhttp.send();
}

var link = "recipes/recipes.json"; // "https://allenjandrew.github.io/wdd130/recipea/recipes/recipes.json";
