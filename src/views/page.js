const Page = function (elementsToSet) {
  this.elementsToSet = elementsToSet;
}

Page.prototype.setPageDetails = function () {
  for (element of this.elementsToSet) {
  this.setText(element[0], element[1]);
  }
};

Page.prototype.setText = function (element, text) {
  const selectedElement = document.querySelector(element);
  selectedElement.textContent = text;
};

module.exports = Page;
