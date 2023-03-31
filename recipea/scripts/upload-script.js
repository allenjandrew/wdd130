function addIngredient() {
  let addButton =
    document.getElementById("upload-ingredients").lastElementChild;
  let ingNum = parseInt(addButton.previousElementSibling.dataset.ingnum) + 1;
  addButton.insertAdjacentHTML(
    "beforebegin",
    `<div class="ing-upl-div" data-ingnum="${ingNum}"><input type="number" name="upload-ingq${ingNum}" id="upload-ingq${ingNum}" /><input type="text" name="upload-ingm${ingNum}" class="upload-ingm${ingNum}" /><input type="text" name="upload-ingi${ingNum}" class="upload-ingi${ingNum}" /></div>`
  );
}

function addDirection() {
  let addButton = document.getElementById("upload-directions").lastElementChild;
  let direcNum =
    parseInt(addButton.previousElementSibling.dataset.direcnum) + 1;
  addButton.insertAdjacentHTML(
    "beforebegin",
    `<div class="upload-step" data-direcnum="${direcNum}"><p>${direcNum}.&nbsp;</p><input type="text" name="upload-direc${direcNum}" id="upload-direc${direcNum}" /></div>`
  );
}

function addNote() {
  let addButton = document.getElementById("upload-notes").lastElementChild;
  let noteNum = parseInt(addButton.previousElementSibling.dataset.notenum) + 1;
  addButton.insertAdjacentHTML(
    "beforebegin",
    `<div class="upload-note" data-notenum="${noteNum}"><input type="text" name="upload-note${noteNum}" id="upload-note${noteNum}" /></div>`
  );
}

function addTag() {
  let addButton = document.getElementById("upload-tags").lastElementChild;
  let tagNum = parseInt(addButton.previousElementSibling.dataset.tagnum) + 1;
  addButton.insertAdjacentHTML(
    "beforebegin",
    `<div class="upload-note" data-tagnum="${tagNum}"><input type="text" name="upload-note${tagNum}" id="upload-note${tagNum}" /></div>`
  );
}
