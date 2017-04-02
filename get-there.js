(function () {
	var headingText = document.getElementById("position-hng");
	var compass = document.getElementById("compass");
	var lookupUserId = document.getElementById("lookupUserId");
	var theUsersPosition = document.getElementById("theUsersPosition");
	var firebaseMetadata = document.getElementById("firebaseMetadata");
	var doTheLookup = document.getElementById("kk");
	var dummyData = document.getElementById("dummyDataId");
	var makeADummy = document.getElementById("makeADummy");

    var database = firebase.database();

    var randomArbitraryNumber = function(from, to) {
    	return Math.floor(Math.random() * (to - from)) + from;
	};

    var makeAnActualDummy = function() {
		database.ref('users/' + dummyData.value).set({
			heading: randomArbitraryNumber(0, 359),
			lat: randomArbitraryNumber(1, 1000),
			lon: randomArbitraryNumber(1, 1000),
			timestamp: new Date()
		}).then(function() {
			console.log("We've written to the firebase DB!");
		});
	};


	var lookupUser = function() {
		var whoWeAreCreepingOn = database.ref("users/" + lookupUserId.value);
		whoWeAreCreepingOn.on('value', function(snapshot) {
			theUsersPosition.textContent = "Lat: "+snapshot.val().lat + ", Lon: "+snapshot.val().lon;
		});
	};


	doTheLookup.onclick = lookupUser;
    makeADummy.onclick = makeAnActualDummy;

	firebaseMetadata.textContent = "We're connected to firebase at "+firebase.app().options.databaseURL;

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