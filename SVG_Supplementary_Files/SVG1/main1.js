/* Name: Job Huisman, Studentnummer: 10119647 */

window.onload = function() {
 	changeColor("gb", 'yellow');
 	changeColor("pl", 'orange');
 	changeColor("ier", 'purple');
 	changeColor("swe", 'pink');
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {

	var elem1 = document.getElementById(id);
	elem1.style.fill = color;
}