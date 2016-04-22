/* Name: Job Huisman, Studentnummer: 10119647 */
// This script fills the color of the EU-countries on the european map. The blue intensity depends on the percentage of non-nationals in the country.

window.onload = function() {

 var codeperland = [["al", "ALB", "Albania"],
	    ["ad", "AND", "Andorra"],
	    ["am", "ARM", "Armenia"],
	    ["at", "AUT", "Austria"],
	    ["bb", "BRB", "Barbados"],
	    ["by", "BLR", "Belarus"],
	    ["be", "BEL", "Belgium"],
	    ["ba", "BIH", "Bosnia and Herzegovina"],
	    ["bg", "BGR", "Bulgaria"],
	    ["hr", "HRV", "Croatia"],
	    ["cy", "CYP", "Cyprus"],
	    ["cz", "CZE", "Czech Republic"],
	    ["dk", "DNK", "Denmark"],
	    ["ee", "EST", "Estonia"],
	    ["fi", "FIN", "Finland"],
	    ["fr", "FRA", "France"],
	    ["ge", "GEO", "Georgia"],
	    ["de", "DEU", "Germany"],
	    ["gi", "GIB", "Gibraltar"],
	    ["gr", "GRC", "Greece"],
	    ["gl", "GRL", "Greenland"],
	    ["gd", "GRD", "Grenada"],
	    ["hu", "HUN", "Hungary"],
	    ["is", "ISL", "Iceland"],
	    ["ie", "IRL", "Ireland"],
	    ["it", "ITA", "Italy"],
	    ["kg", "KGZ", "Kyrgyzstan"],
	    ["lv", "LVA", "Latvia"],
	    ["li", "LIE", "Liechtenstein"],
	    ["lt", "LTU", "Lithuania"],
	    ["lu", "LUX", "Luxembourg"],
	    ["mk", "MKD", "Macedonia, the former Yugoslav Republic of"],
	    ["mt", "MLT", "Malta"],
	    ["md", "MDA", "Moldova, Republic of"],
	    ["mc", "MCO", "Monaco"],
	    ["nl", "NLD", "Netherlands"],
	    ["no", "NOR", "Norway"],
	    ["pl", "POL", "Poland"],
	    ["pt", "PRT", "Portugal"],
	    ["ro", "ROU", "Romania"],
	    ["ru", "RUS", "Russian Federation"],
	    ["sh", "SHN", "Saint Helena, Ascension and Tristan da Cunha"],
	    ["rs", "SRB", "Serbia"],
	    ["sk", "SVK", "Slovakia"],
	    ["si", "SVN", "Slovenia"],
	    ["es", "ESP", "Spain"],
	    ["se", "SWE", "Sweden"],
	    ["ch", "CHE", "Switzerland"],
	    ["ua", "UKR", "Ukraine"],
	    ["gb", "GBR", "United Kingdom"]]

 	// Grenzen
	var tussen1 = 5.0;
	var tussen2 = 10.0;
	var tussen3 = 15.0;
	var tussen4 = 20.0;
	// kleuren per categorie
	var kleur1 = '#f1eef6';
	var kleur2 = '#bdc9e1';
	var kleur3 = '#74a9cf';
	var kleur4 = '#2b8cbe';
	var kleur5 = '#045a8d';

	// get JSON from HTML
 	var data = document.getElementById("countrydata").innerHTML;
	country = JSON.parse(data);

	// iterate over all countries and their data
	for (var i = 0; i < country.points.length; i++){
		var land = country.points[i].Country;
		var valuedata = country.points[i].data;
		code = intocode(land, valuedata);
	}

	// functie: find id of country
	function intocode(naam, value) {
		for(var i = 0; i < codeperland.length; i++){
			if (codeperland[i][2] == naam){
				id = codeperland[i][0];
				return (changeColor(id, value));
			}
		}
	}

	//changeColor takes a path ID and a color and changes that path's fill color
	function changeColor(id, value){
		var color = "";
		var elem1 = document.getElementById(id);
		if(elem1 != null){
		if(value < tussen1){
			color = kleur1;
		}
		if(tussen1 <= value && value < tussen2){
			color = kleur2;
		}
		if(tussen2 <= value && value < tussen3){
			color = kleur3;
		}
		if(tussen3 <= value && value < tussen4){
			color = kleur4;
		}
		if(value > tussen4){
			color = kleur5;
		}
		elem1.style.fill = color;
		}
	}
}