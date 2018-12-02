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
      value:'Brewdog Beers'
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
      value:'Brewdog Beers'
    },
    {
      type: 'label',
      container:document.querySelector('header'),
      classToSet:'filter_label',
      attr:'textContent',
      value:'Display By ABV:'
    },
    {
      type: 'select',
      container:document.querySelector('header'),
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
"https://www.brewdog.com/admin/js/libs/tinymce/plugins/moxiemanager/data/files/BLOG%20PHOTOS/Christmas_5.MixedCase.jpg",
"https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/beer_mug.png",
'filter_label',
'data_select'
);
  page.setPageDetails();
  const dataModel = new DataModel("https://api.punkapi.com/v2/beers", ['name', 'tagline', 'image_url', 'description', 'first_brewed', 'volume.value', 'method.fermentation.temp.value'], 'abv');
  dataModel.getData();
  const dataList = new DataList('data_container');
  dataList.bindEvents();
  const selectView = new SelectView('data_select');
  selectView.bindEvents();
});
