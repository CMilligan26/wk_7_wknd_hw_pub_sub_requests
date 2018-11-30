const Page = function (title, header) {
  this.title = title;
  this.header = header;
}

Page.prototype.setPageDetails = function () {
  this.setText('.custom_title', this.title);
  this.setText('.custom_header', this.header);
};

Page.prototype.setText = function (element, text) {
  const selectedElement = document.querySelector(element);
  selectedElement.textContent = text;
};

module.exports = Page;
