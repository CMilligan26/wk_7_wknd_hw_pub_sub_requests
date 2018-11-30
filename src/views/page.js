const Page = function (elementsToSet = []) {
  this.elementsToSet = elementsToSet;
}

Page.prototype.setPageDetails = function () {
  for (element of this.elementsToSet) {
    console.log(element.container);
    this.createNewElement(element.type, element.container, element.classToSet, element.attr, element.value);
  };
};

Page.prototype.createNewElement = function (type, container, classToSet, attr, value) {
  const newElement = document.createElement(type);
  newElement.className = classToSet;
  newElement[attr] = value;
  container.appendChild(newElement);
  return newElement;
};

module.exports = Page;
