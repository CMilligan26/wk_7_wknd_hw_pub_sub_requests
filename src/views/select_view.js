const PubSub = require('../helpers/pub_sub.js');
const Page = require('./page.js');

const SelectView = function (select, filterName) {
  this.select = document.querySelector(`.${select}`);
  this.filterName = filterName;
  this.page = new Page();
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:select-data-ready", (data) => {
    this.addSelectDefault();
    this.addSelectAll();
    this.populate(data.detail);
  });
  this.select.addEventListener('change', (event) => {
    PubSub.publish('SelectView:filter-selected', event.target.value);
  });
};

SelectView.prototype.addSelectDefault = function () {
  const defaultOption = this.page.createNewElement('option', this.select, '', 'textContent', `Choose ${this.filterName}`);
  defaultOption.selected = 'true';
  defaultOption.disabled = 'true';
};

SelectView.prototype.addSelectAll = function () {
  this.page.createNewElement('option', this.select, '', 'textContent', 'All');
};

SelectView.prototype.populate = function (selectedOptions) {
  selectedOptions.forEach((option) => {
    this.page.createNewElement('option', this.select, '', 'textContent', option);
  });
};

module.exports = SelectView;
