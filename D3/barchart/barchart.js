/* Name: Job Huisman, Studentnummer: 10119647 */
// This script fills the color of the EU-countries on the european map. The blue intensity depends on the percentage of non-nationals in the country.

window.onload = function() {
	d3.json("knmi2015.json", function(data){
    	console.log("Data: ", data);
	})
}