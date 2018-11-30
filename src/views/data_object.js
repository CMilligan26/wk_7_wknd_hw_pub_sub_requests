const Page = require('./page.js');

const DataObject = function () {
  this.page = new Page();
}

DataObject.prototype.create = function (data, container) {
  const div = this.page.createNewElement('div', container, 'data_item', 'textContent', '')
  for (item of data) {
  this.page.createNewElement('p', div, 'data_item_detail', 'textContent', item)
  }
};

module.exports = DataObject;
