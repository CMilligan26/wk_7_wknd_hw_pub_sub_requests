const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const DataModel = function (url, dataToCollect, selectData) {
  this.url = url;
  this.dataToCollect = dataToCollect;
  this.selectData = selectData;
  this.data = null;
  this.requestHelper = new RequestHelper();
}

DataModel.prototype.getData = function () {
  this.requestHelper.get(this.url).then((data) => {
    this.data = data;
    PubSub.publish("DataModel:extracted-data-ready", this.extractData(data, this.dataToCollect));
    PubSub.publish("DataModel:select-data-ready", this.extractSelectData());
  });
  PubSub.subscribe('SelectView:filter-selected', (selected) => {
    PubSub.publish('DataModel:extracted-data-ready', this.filterData(selected.detail));
  })
};

DataModel.prototype.extractData = function (dataToExtractFrom, dataToCollect) {
  const extractedData = [];
  dataToExtractFrom.forEach((data) => {
    const dataCollection = [];
    dataToCollect.forEach((dataToCollect) => {
      if (data[dataToCollect].includes('http')) {
        const infoName = data[dataToCollect];
        dataCollection.push(infoName);
      } else {
        const infoName = dataToCollect.charAt(0).toUpperCase() + dataToCollect.slice(1);
        dataCollection.push(`${infoName}: ${data[dataToCollect]}`);
      }
    })
    extractedData.push(dataCollection);
  })
  return extractedData;
};

DataModel.prototype.extractSelectData = function () {
  const extractedSelectData = this.data.map(data => data[this.selectData]).filter((data, index, extractedSelectData) => extractedSelectData.indexOf(data) === index);
  return extractedSelectData.sort(function(a, b){return a-b});
};

DataModel.prototype.filterData = function (filterBy) {
  const filteredData = this.data.filter(data => String(data[this.selectData]) === filterBy);
  return this.extractData(filteredData, this.dataToCollect);
};


module.exports = DataModel;
