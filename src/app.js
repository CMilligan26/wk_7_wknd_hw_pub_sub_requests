const Page = require('./views/page.js');
const DataModel = require('./models/data_model.js');

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page([['.custom_title', 'Title'], ['.custom_header', 'Header']]);
  page.setPageDetails();
  const dataModel = new DataModel("https://munroapi.herokuapp.com/api/munros", ['name', 'meaning']);
  dataModel.getData();
});
