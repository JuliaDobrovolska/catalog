import 'bootstrap';


var catalogItemTemplate = document.getElementById('catalogItemTmp');
var xhr = new XMLHttpRequest();
var listOfItems = document.querySelector('#listItems');


xhr.responseType = 'json';
xhr.open('GET', './json/furniture.json');

xhr.onload = function () {
  var furnitureJSON = this.response;
    furnitureJSON.reduce(function (fragment, catalog) {
        var currentTpl = catalogItemTemplate.content.cloneNode(true);
        var furnitureLink = currentTpl.querySelector('.furnitureLink');

        furnitureLink.textContent = catalog.title;
        furnitureLink.dataset.id = catalog.id;
       
        fragment.appendChild(currentTpl);
      
      return fragment;
    }, listOfItems);
    

    listOfItems.addEventListener('click', function (e) {
      if (e.target.matches('li')) {

        var catalogContainer = document.querySelector('.catalog__container');
        var mainContent = document.getElementById('mainContent');
        mainContent.removeChild(catalogContainer);
        var furnitureTemplate = document.getElementById('furnitureTemp');
        var furnitureClone = furnitureTemplate.content.cloneNode(true);
       
          for(var i = 0; i<furnitureJSON.length; i++){
            if(furnitureJSON[i].id == e.target.dataset.id){
              
              furnitureClone.querySelector('.furniture__title').textContent = furnitureJSON[i].title;
              furnitureClone.querySelector('.photo1').src = furnitureJSON[i].photo1;
              furnitureClone.querySelector('.photo2').src = furnitureJSON[i].photo2;
              furnitureClone.querySelector('.photo3').src = furnitureJSON[i].photo3;
              furnitureClone.querySelector('.furniture__description').textContent = furnitureJSON[i].description;
             
              mainContent.appendChild(furnitureClone);
            }
          }  
      }
  });


};
xhr.send();




