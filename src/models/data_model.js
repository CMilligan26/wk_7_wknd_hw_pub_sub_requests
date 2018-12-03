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
      itemValue = this.getItem(data, item);
      if (itemValue.includes('http')) {
        dataCollection.push(itemValue);
      } else {
        const infoName = this.getItemName(item);
        dataCollection.push([infoName, itemValue]);
      };
    };
    extractedData.push(dataCollection);
  };
  return extractedData;
};

DataModel.prototype.getItemName = function (item) {
  const itemName = item.split('.');
  let fixedName = '';
  for (const label of itemName) {
    fixedName += label.charAt(0).toUpperCase() + label.slice(1).replace('_', ' ');
    fixedName += ' ';
    if (itemName.indexOf(label) === itemName.length-2) {
      break;
    };
  };
  fixedName += ': ';
  return fixedName;
};

DataModel.prototype.getItem = function (data, item) {
  let itemValue = null;
  if (item.includes('.')) {
    itemValue = this.nestedAccess(data, item);
  }
  else {
    itemValue = data[item];
  };
  return itemValue;
};

DataModel.prototype.nestedAccess = function (bigObject, attrPath) {
  const splitPath = attrPath.split('.');
  let fullPath = bigObject;
  let iterator = 0;
  let isArray = false;
  for (const path of splitPath) {
    fullPath = fullPath[path];
    iterator += 1;
    if (fullPath.constructor.name === 'Array') {
      isArray = true;
      break;
    };
  };
  if (isArray === false) {
    return `${this.getItemName(splitPath[iterator-1])} ${fullPath}`;
  } else {
    return this.nestedArrayAccess(fullPath, splitPath[iterator]);
  };
};

DataModel.prototype.nestedArrayAccess = function (objectArray, itemToExtract) {
  const itemsToExtractArray = itemToExtract.split('/');
  let requiredInfo = [];
  for (const object of objectArray) {
    for (const item of itemsToExtractArray) {
      if (object[item].constructor.name === 'Object') {
        const keys = Object.keys(object[item])
        for (const key of keys) {
          requiredInfo.push(this.nestedAccess(object[item], key));
        }
      } else {
        requiredInfo.push(`${this.getItemName(item)} ${object[item]} `);
      };
    };
  };
  return requiredInfo;
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
