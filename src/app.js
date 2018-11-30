const Page = require('./views/page.js');
const DataModel = require('./models/data_model.js');
const DataList = require('./views/data_list.js');

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page([
    {
      type:'title',
      container:document.querySelector('head'),
      classToSet:'custom_title',
      attr:'textContent',
      value:'Title'
    },
    {
      type:'h1',
      container:document.querySelector('header'),
      classToSet:'custom_header',
      attr:'textContent',
      value:'Header'
    },
    {
      type: 'div',
      container:document.querySelector('body'),
      classToSet:'data_container',
      attr:'textContent',
      value:''
    }
  ]);
  page.setPageDetails();
  const dataModel = new DataModel("https://api.punkapi.com/v2/beers", ['name', 'tagline', 'image_url']);
  dataModel.getData();
  const dataList = new DataList('data_container');
  dataList.bindEvents();
});
