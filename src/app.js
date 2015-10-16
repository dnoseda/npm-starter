var $grid;
$(function(){

  MELI.init({client_id: 6586});

  $grid = $('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

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
});

