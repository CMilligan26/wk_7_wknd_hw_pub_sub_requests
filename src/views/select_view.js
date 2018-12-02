const PubSub = require('../helpers/pub_sub.js');
const Page = require('./page.js');

const SelectView = function (select) {
  this.select = document.querySelector(`.${select}`);
  this.page = new Page();
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:select-data-ready", (data) => {
    this.addSelectAll();
    this.populate(data.detail);
  });
  this.select.addEventListener('change', (event) => {
    PubSub.publish('SelectView:filter-selected', event.target.value);
  });
};

SelectView.prototype.addSelectAll = function () {
  const defaultOption = this.page.createNewElement('option', this.select, '', 'textContent', 'All');
  defaultOption.selected = 'true';
};

SelectView.prototype.populate = function (selectedOptions) {
  selectedOptions.forEach((option) => {
    this.page.createNewElement('option', this.select, '', 'textContent', option);
  });
};

module.exports = SelectView;
