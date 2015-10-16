var grid;
var $ = require('jquery')
var Handlebars = require('handlebars')
var Isotope = require('isotope-layout')
var MP = require('./mercadolibre-1.0.4')



  MELI.init({client_id: 6586});


  window.globalGrid =  new Isotope('.grid', {
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  $("#search").on("click",function(){
    console.log("clicking");
    var query = $("#query").val();
    MELI.get('/sites/MLA/search?q='+query, null, function(data) {
      // Your code here
      // var name = data[2]
      console.log("data2");
      console.log(data[2].results);
      for(var a in data[2].results){
        var item = data[2].results[a];
        var itemHtml = template(item);
        //globalGrid.isotope('insert',$(itemHtml));
        globalGrid.insert($(itemHtml));
      }
    });
  });
  

