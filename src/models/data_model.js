const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const DataModel = function (url, dataToCollect, selectData) {
  this.url = url;
  this.dataToCollect = dataToCollect;
  this.selectData = selectData;
  this.data = null;
  this.requestHelper = new RequestHelper();
};

DataModel.prototype.getData = function () {
  this.requestHelper.get(this.url).then((data) => {
    this.data = data;
    PubSub.publish("DataModel:extracted-data-ready", this.extractData(data, this.dataToCollect));
    PubSub.publish("DataModel:select-data-ready", this.extractSelectData());
  });
  PubSub.subscribe('SelectView:filter-selected', (selected) => {
    PubSub.publish('DataModel:extracted-data-ready', this.filterData(selected.detail));
  });
};

DataModel.prototype.extractData = function (dataToExtractFrom, dataToCollect) {
  const extractedData = [];
  for (const data of dataToExtractFrom) {
    const dataCollection = [];
    for (const item of dataToCollect) {
      let infoName = null;
      if (data[item].includes('http')) {
        infoName = data[item];
        dataCollection.push(infoName);
      } else {
        infoName = item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ');
        dataCollection.push(`${infoName}: ${data[item]}`);
      };
    };
    extractedData.push(dataCollection);
  };
  return extractedData;
};

DataModel.prototype.extractSelectData = function () {
  const extractedSelectData = this.data.map(data => data[this.selectData]).filter((data, index, extractedSelectData) => extractedSelectData.indexOf(data) === index);
  return extractedSelectData.sort(function(a, b){return a-b});
};

DataModel.prototype.filterData = function (filterBy) {
  let filteredData = null;
  if (filterBy !== 'All') {
    filteredData = this.data.filter(data => String(data[this.selectData]) === filterBy);
  } else {
    filteredData = this.data;
  };
  return this.extractData(filteredData, this.dataToCollect);
};

module.exports = DataModel;
