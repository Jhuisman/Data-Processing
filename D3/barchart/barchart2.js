/* Name: Job Huisman, Studentnummer: 10119647 */
// This script makes an barchart, without an correct x-axis. Not able to rotate text at axis.
// The barchart displays the average temperature for the year 2015.
// Missing: pop-up

window.onload = function() {

// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .15);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// getting json
d3.json("knmi20152.json", function(error, data) {

    data.forEach(function(d) {
    	d.YYYYMMDD = d.YYYYMMDD;
        d.TG = d.TG;
        d.CE = +(parseInt(d.TG))/10;
    });
    
  // the range
x.domain(data.map(function(d) { return d.CE; }));
y.domain([d3.min(data, function(d) { return d.CE; }), d3.max(data, function(d) { return d.CE; })]);

// x axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 30)
    .attr("y", 1140)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Days")

// y axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Celsius");


// rect per bar in data
svg.selectAll("bar")
    .data(data)
  	.enter()
  		.append("rect")
	    .attr("class", "bar")
	    .attr("x", function(d) { return x(d.CE); })
	    .attr("width", x.rangeBand())
	    .attr("y", function(d) { return y(d.CE); })
	    .attr("height", function(d) { return height - y(d.CE); });
});
}