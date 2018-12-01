const Page = require('./views/page.js');
const DataModel = require('./models/data_model.js');
const DataList = require('./views/data_list.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page([
    {
      type:'title',
      container:document.querySelector('head'),
      classToSet:'custom_title',
      attr:'textContent',
      value:'Countries'
    },
    {
      type:'h1',
      container:document.querySelector('header'),
      classToSet:'custom_header',
      attr:'textContent',
      value:'Countries'
    },
    {
      type: 'select',
      container:document.querySelector('body'),
      classToSet:'data_select',
      attr:'textContent',
      value:''
    },
    {
      type: 'div',
      container:document.querySelector('body'),
      classToSet:'data_container',
      attr:'textContent',
      value:''
    }
  ],
"https://geology.com/world/world-physical-map.jpg"
);
  page.setPageDetails();
  const dataModel = new DataModel("https://restcountries.eu/rest/v2/all", ['name', 'flag', 'capital'], 'region');
  dataModel.getData();
  const dataList = new DataList('data_container');
  dataList.bindEvents();
  const selectView = new SelectView('data_select', 'Region');
  selectView.bindEvents();
});
