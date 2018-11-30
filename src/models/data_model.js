const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const DataModel = function (url, dataToCollect) {
  this.url = url;
  this.dataToCollect = dataToCollect;
  this.data = null;
  this.requestHelper = new RequestHelper();
}

DataModel.prototype.getData = function () {
  this.requestHelper.get(this.url).then((data) => {
    this.data = data;
    PubSub.publish("DataModel:extracted-data-ready", this.extractData());
  });
};

DataModel.prototype.extractData = function () {
  const extractedData = [];
  this.data.forEach((data) => {
    const dataCollection = [];
    this.dataToCollect.forEach((dataToCollect) => {
      dataCollection.push(data[dataToCollect]);
    })
    extractedData.push(dataCollection);
  })
  return extractedData;
};


module.exports = DataModel;
