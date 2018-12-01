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
      type:'link',
      container:document.querySelector('head'),
      classToSet:'icon',
      attr:'rel',
      value:'icon'
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
  document.querySelector('.icon').href = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzCJ-4TEdVHAMHRDazFTvoZiMDKI5soqMViFoQ62ojQ7Qm2IE-7A"
  const dataModel = new DataModel("https://restcountries.eu/rest/v2/all", ['name', 'flag', 'capital'], 'region');
  dataModel.getData();
  const dataList = new DataList('data_container');
  dataList.bindEvents();
  const selectView = new SelectView('data_select', 'Region');
  selectView.bindEvents();
});
