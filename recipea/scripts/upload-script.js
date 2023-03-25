function addIngredient() {
  let addButton =
    document.getElementById("upload-ingredients").lastElementChild;
  let ingNum = parseInt(addButton.previousElementSibling.dataset.ingnum) + 1;
  addButton.insertAdjacentHTML(
    "beforebegin",
    `<div data-ingnum="${ingNum}"><input type="number" name="upload-ingq${ingNum}" id="upload-ingq${ingNum}" /><input type="text" name="upload-ingm${ingNum}" class="upload-ingm${ingNum}" /><input type="text" name="upload-ingi${ingNum}" class="upload-ingi${ingNum}" /></div>`
  );
}
