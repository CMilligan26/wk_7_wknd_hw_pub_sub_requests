const PubSub = require('../helpers/pub_sub.js');

const Page = function (elementsToSet, backgroundImage, iconImage, labelClass, selectClass) {
  this.elementsToSet = elementsToSet;
  this.backgroundImage = backgroundImage;
  this.iconImage = iconImage;
  this.labelClass = labelClass;
  this.selectClass = selectClass;
};

Page.prototype.setPageDetails = function () {
  for (const element of this.elementsToSet) {
    this.createNewElement(element.type, element.container, element.classToSet, element.attr, element.value);
  };
  this.setBackgroundImage();
  this.setIconImage();
  this.setSelectLabel();
};

Page.prototype.createNewElement = function (type, container, classToSet, attr, value) {
  const newElement = document.createElement(type);
  newElement.className = classToSet;
  newElement[attr] = value;
  container.appendChild(newElement);
  return newElement;
};

Page.prototype.setBackgroundImage = function () {
  document.querySelector('html').style.backgroundImage = `url(${this.backgroundImage})`;
};

Page.prototype.setIconImage = function () {
  document.querySelector('.icon').href = this.iconImage;
};

Page.prototype.setSelectLabel = function () {
  document.querySelector(`.${this.selectClass}`).id = "filter_select";
  document.querySelector(`.${this.labelClass}`).for = "filter_select";
};

module.exports = Page;
