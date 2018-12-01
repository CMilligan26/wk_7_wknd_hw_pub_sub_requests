const Page = function (elementsToSet, backgroundImage) {
  this.elementsToSet = elementsToSet;
  this.backgroundImage = backgroundImage;
}

Page.prototype.setPageDetails = function () {
  for (element of this.elementsToSet) {
    this.createNewElement(element.type, element.container, element.classToSet, element.attr, element.value);
  };
  this.setBackgroundImage();
};

Page.prototype.createNewElement = function (type, container, classToSet, attr, value) {
  const newElement = document.createElement(type);
  newElement.className = classToSet;
  newElement[attr] = value;
  container.appendChild(newElement);
  return newElement;
};

//rewrite using create new element to add an image with absolute position and set opacity
Page.prototype.setBackgroundImage = function () {
    const html = document.querySelector('html');
    html.style.backgroundImage = `url(${this.backgroundImage})`;
};

module.exports = Page;
