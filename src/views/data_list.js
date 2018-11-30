const PubSub = require('../helpers/pub_sub.js')

DataList = function () {

}

DataList.prototype.bindEvents = function () {
  PubSub.subscribe("DataModel:extracted-data-ready", (event) => {
    
  })
};

module.exports = DataList();
