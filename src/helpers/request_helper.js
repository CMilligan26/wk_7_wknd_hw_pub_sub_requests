const RequestHelper = function () {

};

RequestHelper.prototype.get = function (url) {
  return fetch(url).then((response) => response.json());
};

module.exports = RequestHelper;
