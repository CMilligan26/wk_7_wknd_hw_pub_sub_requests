const DataModel = require('./models/data_model.js');

document.addEventListener('DOMContentLoaded', () => {
  const dataModel = new DataModel("https://munroapi.herokuapp.com/api/munros", ['name', 'meaning']);
  dataModel.getData();
});
