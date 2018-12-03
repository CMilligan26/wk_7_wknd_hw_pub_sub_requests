const Page = require('./page.js');

const DataObject = function () {
  this.page = new Page();
};

DataObject.prototype.create = function (data, container) {
  const div = this.page.createNewElement('div', container, 'data_item', 'textContent', '');
  for (const item of data) {
    if (item.includes('http')  === false) {
      this.createDetails(item, div);
    }
    else {
      const figure = this.page.createNewElement('figure', div, 'data_item_image_container', 'textContent', '');
      this.page.createNewElement('img', figure, 'data_item_image', 'src', item);
    };
  };
};

DataObject.prototype.createDetails = function (item, container) {
  for (const detail of item) {
    if (detail.constructor.name !== 'Array') {
      this.page.createNewElement('p', container, 'data_item_detail', 'textContent', detail);
    } else {
      for (const line of detail) {
        this.page.createNewElement('p', container, 'data_item_detail', 'textContent', line)
      };
    };
  };
};

module.exports = DataObject;
