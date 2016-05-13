/* Name: Job Huisman, Studentnummer: 10119647 */
// This script makes a line chart using the d3 library, 

// standaard maten voor svg
var margin = {top: 20, right: 20, bottom: 40, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// scale x-as
var x = d3.scale.linear()
    .range([0,width]);

// scale y-as
var y = d3.scale.linear()
    .domain([0, 30])
    .range([height, 0]);

// info voor assen
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom").ticks(31);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// lijn gemiddelde wind
var FG = d3.svg.line()
    .x(function(d) { return x(d.YYYYMMDD); })
    .y(function(d) { return y(d.FG); });

// lijn laagst gemeten wind
var FHN = d3.svg.line()
    .x(function(d) { return x(d.YYYYMMDD); })
    .y(function(d) { return y(d.FHN); });

// lijn max wind
var FXX = d3.svg.line()
    .x(function(d) { return x(d.YYYYMMDD); })
    .y(function(d) { return y(d.FXX); });

// aanmaken "canvas"
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// inladen meerdere jsons
queue()
        .defer(d3.json, 'knmi_maart2016_wind.json')
        .defer(d3.json, 'knmi_april2016_wind.json')
        .defer(d3.json, 'knmi_mei2016_wind.json')
        .await(d3lineExtended);

// gebruik jsons
function d3lineExtended (error, maart, april, mei) {
    
//on click button, lukt niet. getracht keuze van button als argument door te laten geven via html buttons. Echter wordt dat niet herkend. Ook via een eventlistener geprobeerd maar dat had geen result
//function myFunction(keuze) {

//omzetten json gegevens
  maart.points.forEach(function(d) {
      d.YYYYMMDD = d.YYYYMMDD.slice(6);
      d.FG = +d.FG/10;
      d.FHN = +d.FHN/10;
      d.FXX = +d.FXX/10;
    });

     x.domain(d3.extent(maart.points, function(d) { return d.YYYYMMDD; }));

// x-as
svg.append("g")
    .attr( "class", "x axis")
    .attr( "transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
  .attr("x", 890)
  .attr("y", 32)
  .attr("dx", ".71em")
  .style("text-anchor", "end")
  .text("day in April");

// y-as
svg.append("g")
    .attr( "class", "y axis")
    .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("windspeed (m/s)");

// append the lines
svg.append("path")
    .datum(maart.points)
    .attr("class", "line")
    .attr("d", FG)
    .style("stroke", "steelblue");

svg.append("path")
    .datum(maart.points)
    .attr("class", "line")
    .attr("d", FHN)
    .style("stroke", "red");

svg.append("path")
    .datum(maart.points)
    .attr("class", "line")
    .attr("d", FXX)
    .style("stroke", "green");

// bijvoegen crosshair met text
var focus = svg.append('g')
    .style('display', 'none');

focus.append('line')
    .attr('id', 'focusLineX')
    .attr('class', 'focusLine');

focus.append('text')
    .attr('id', 'CrossInfo')
    .attr('class', 'focusText')
    .style('font', '20px sans-serif');

var crosspoint = d3.bisector(function(d) { return d.YYYYMMDD; }).left;

// interactivity van de crosshair
svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .style("fill", "none")
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    .on('mousemove', function() { 
      var mouseDate = x.invert(d3.mouse(this)[0]);
      var i = crosspoint(maart.points, mouseDate); // returns the index to the current data item

      var d0 = maart.points[i - 1];
      var d1 = maart.points[i];
      // work out which date value is closest to the mouse
      var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
      var xco = x(d.YYYYMMDD);

      // crossline
      focus.select('#focusLineX')
          .attr('y1', 0).attr('y2', height)
          .attr('x1', xco).attr('x2', xco);

      // textbox
      focus.select("#CrossInfo")
        .attr("transform", "translate(" + (x(d.YYYYMMDD)+5) + "," + (10) + ")")
        .text("Max: " + d.FXX + "  ;  "+ "Ave: " + d.FG +"  ;  " + "Min: " + d.FHN);
});
}
//}