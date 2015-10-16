var grid;
var Handlebars = require('handlebars')
var Isotope = require('isotope-layout')
var grid;
var MP = require('./mercadolibre-1.0.4')


  MELI.init({client_id: 6586});

  grid = new Isotope('.grid',{
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  window.grid = grid;

  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  $("#submit").on("click",function(){
    var query = $("#search").val();
    MELI.get('/sites/MLA/search?q='+query, null, function(data) {
      // Your code here
      // var name = data[2]
      console.log("data2");
      console.log(data[2].results);
      for(var a in data[2].results){
        var item = data[2].results[a];
        var itemHtml = template(item);
        $grid.isotope('insert',$(itemHtml));
      }
    });
  });

