/* Name: Job Huisman, Studentnummer: 10119647 */
// This script makes a line chart using the d3 library, 

function color(value) {

    if(value == ""){
      return "";
    }
    else if(value < 28){
      return "1";
    }
    else if(28 <= value && value < 71){
      return "2";
    }
    else if(71 <= value < 136){
      return "3";
    }
    else if(136 <= value < 242){
      return "3";
    }
    else {
      return "4";
    }

};


// inladen data
d3.csv("mortality.csv", function(error, data) {
  if (error) throw error;

  console.log(data);

  dataset = {};

  data.forEach(function(d){
      dataset[d.countrycode] = {fillKey: color(+d.Y1990), value: (+d.Y1990)}
  });

  console.log(dataset);

  if (error) return console.error(error);


  var basic_choropleth = new Datamap({
  element: document.getElementById("worldmap"),
  projection: 'mercator',
  height:700,
  fills: {
    defaultFill: "#ABDDA4",
    "1" : "#ffffb2",
    "2" : "#fecc5c",
    "3" : "#fd8d3c",
    "4" : "#e31a1c"
  },
  data: dataset});

// omschrijven naar een andere array useable voor fillkey procedure

// [countrycode] {fillKey: function(d.value); value: }


});