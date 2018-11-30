const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const DataModel = function (url, dataToCollect) {
  this.url = url;
  this.dataToCollect = dataToCollect;
  this.data = null;
}

DataModel.prototype.getData = function () {
  debugger;
  RequestHelper.get(this.url).then((data) => {
    this.data = data;
    const dataToSend = this.extractData();
    PubSub.publish("DataModel:data-ready", dataToSend);
  });
};

DataModel.prototype.extractData = function () {
  const extractedData = [];
  for (data in this.data) {
    const dataCollection = [];
    for (dataToCollect in this.dataToCollect) {
      dataCollection.push(data[dataToCollect]);
    }
    extractedData.push(dataCollection);
  }
  return extractedData;
};


module.exports = DataModel;
