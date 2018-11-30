const Page = require('./page.js');

const DataObject = function () {
  this.page = new Page();
}

DataObject.prototype.create = function (data, container) {
  const div = this.page.createNewElement('div', container, 'data_item', 'textContent', '')
  div.className += " data_item"
  for (item of data) {
    if (item.includes('http')  === false) {
      this.page.createNewElement('p', div, 'data_item_detail', 'textContent', item)
    } else {
      this.page.createNewElement('img', div, 'data_item_image', 'src', item)
    }
  }
};

module.exports = DataObject;
