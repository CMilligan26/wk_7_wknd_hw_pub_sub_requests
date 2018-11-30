const PubSub = require('../helpers/pub_sub.js')
const Page = require('./page.js')
const DataObject = require('./data_object.js');

const DataList = function (container) {
  this.container = document.querySelector(`.${container}`);
  this.container.className += ' data_container';
  this.dataObject = new DataObject();
}

DataList.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:extracted-data-ready", (data) => {
    this.addToList(data.detail);
  })
};

DataList.prototype.addToList = function (data_set) {
  for (data of data_set) {
    this.dataObject.create(data, this.container);
  };
};

module.exports = DataList;
