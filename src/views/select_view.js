const PubSub = require('../helpers/pub_sub.js')
const Page = require('./page.js')

const SelectView = function (select, filterName) {
  this.select = document.querySelector(`.${select}`);
  this.select.className += " data_select";
  this.filterName = filterName;
  this.page = new Page();
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:select-data-ready", (data) => {
    this.addSelectDefault();
    this.populate(data.detail);
  });
};

SelectView.prototype.addSelectDefault = function () {
  const defaultOption = this.page.createNewElement('option', this.select, '', 'textContent', `Choose ${this.filterName}`);
  defaultOption.selected = 'true';
  defaultOption.disabled = 'true';
};

SelectView.prototype.populate = function (selectedOptions) {
  selectedOptions.forEach((option) => {
    this.page.createNewElement('option', this.select, '', 'textContent', option);
  })
};

module.exports = SelectView;
