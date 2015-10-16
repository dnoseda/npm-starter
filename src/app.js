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

    
    Number.prototype.formatMoney = function(c, d, t){
      var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    var currencyFormat = function(amount){
      var decimalPlaces = 2 // _globalLocalization.currency.decimalPlaces;
      var decimalSeparator = ","// _globalLocalization.country.decimalSeparator;
      var thousandsSeparator = "." //_globalLocalization.country.thousandsSeparator;
      var symbol = "$" // _globalLocalization.currency.symbol;
      if(amount){
        amount = parseFloat(amount);
        var strAmount = amount.formatMoney(
          decimalPlaces,
          decimalSeparator,
          thousandsSeparator
          );

        if(decimalPlaces){
          strAmount = strAmount.replace(decimalSeparator, "<sup>") + "</sup>";
        }
        return symbol + " "+
        strAmount;
      }else{
        return "";
      }
    }

    var source   = $("#entry-template").html();
    Handlebars.registerHelper("currency", currencyFormat);
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
    

