(function () {
	var headingText = document.getElementById("position-hng");
	var compass = document.getElementById("compass");

	console.log(headingText.textContent);

	headingText.textContent = 123;

	Compass.noSupport(function () {
		headingText.textContent = "death fire";
		console.log("no sup");
	}).needGPS(function () {
		console.log("need gps");
	}).needMove(function () {
		console.log("neeeeed move");
	}).init(function (method) {
		if ( method == 'orientationAndGPS' ) {
			headingText.textContent = Math.round(Compass._gpsDiff);
			console.log("wutttt");
		}
	}).watch(function (heading) {
		var degrees = 365 - Math.round(heading);
		
		compass.style.webkitTransform = 'rotate('+degrees+'deg)'; 
		compass.style.mozTransform    = 'rotate('+degrees+'deg)'; 
		compass.style.msTransform     = 'rotate('+degrees+'deg)'; 
		compass.style.oTransform      = 'rotate('+degrees+'deg)'; 
		compass.style.transform       = 'rotate('+degrees+'deg)'; 
		
	});
	}());