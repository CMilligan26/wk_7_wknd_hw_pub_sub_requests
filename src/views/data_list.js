const PubSub = require('../helpers/pub_sub.js')
const Page = require('./page.js')
const DataObject = require('./data_object.js');

const DataList = function () {
  this.page = new Page([{
        type:'div',
        container:document.querySelector('body'),
        classToSet:'data_container',
        attr:'textContent',
        value:''
      }]);
  this.page.setPageDetails();
  this.dataObject = new DataObject();
}

DataList.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:extracted-data-ready", (data) => {
    this.addToList(data.detail);
  })
};

DataList.prototype.addToList = function (data_set) {
  debugger;
  for (data of data_set) {
    this.dataObject.create(data, document.querySelector('.data_container'));
  };
};

module.exports = DataList;
