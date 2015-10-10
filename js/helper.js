// %data% sections will be replaced with real info in the resumeBuilder file
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="nameSub">%data%</span><div class="border-underline"></div>';

var HTMLcontactStart = '<ul class="contact"></ul>';
var HTMLcontactGeneric = '<li class="flex-item"><span class="blue-text">%contact%</span><span class="black-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="blue-text">mobile</span><span class="black-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="blue-text">email</span><span class="black-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="blue-text">twitter</span><span class="black-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="blue-text">github</span><span class="black-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="blue-text">blog</span><span class="black-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="blue-text">location</span><span class="black-text">%data%</span></li>';
var HTMLfooterName = '<li class="flex-item"><span class="blue-text">name</span><span class="black-text">%data%</span></li>';

var HTMLbioPic = '<div class="biopic-container"><img src="%data%" class="biopic"></div>';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="black-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<div class="work-title">%data%';
var HTMLworkTitle = ' - %data%</div>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescriptionStart = '<br><ul class="work-description"></ul>';
var HTMLworkDescription = '<li>● %data%</li>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#" class="project-title">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%" alt="Project screenshot">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#" class="school-title">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" class="class-title">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


// Setting up the map
var map;

function initializeMap() {

	var locations;

	// Styles for the map
	var styles = [
	  {
	  	"featureType": "road",
	    "stylers": [
	      { "color": "#e890ba" }
	    ]},
	  {
	    "featureType": "landscape.man_made",
	    "stylers": [
	      { "color": "#dec8e8" }
	    ]},
	  {
	    "featureType": "water",
	    "stylers": [
	      { "color": "#87beff" }
	    ]},
	  {
	    "featureType": "landscape.natural",
	    "stylers": [
	      { "color": "#f2eb80" },
	      { "lightness": 23 }
	    ]},
	  {
	    "featureType": "landscape.natural.terrain",
	    "stylers": [
	      { "color": "#13b36f" }
	    ]}
	];

	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	var mapOptions = {
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    }
	};

	map = new google.maps.Map(document.querySelector('#map'), mapOptions);

	// Add the map style to the map
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	/*
	locationFinder() returns an array of every location string from the JSONs
	written for bio, education, and work.
	*/
	function locationFinder() {

		// initializes an empty array
		var locations = [];

		// adds the single location property from bio to the locations array
		locations.push(kislerBio.contact.location);

		// iterates through school locations and appends each location to
		// the locations array
		for (var school in education.schools) {
			locations.push(education.schools[school].location);
		}

		// iterates through work locations and appends each location to
		// the locations array
		for (var job in work.jobs) {
			locations.push(work.jobs[job].location);
		}

		return locations;
	}

	/*
	createMapMarker(placeData) reads Google Places search results to create map pins.
	placeData is the object returned from search results containing information
	about a single location.
	*/
	function createMapMarker(placeData) {

		// The next lines save location data from the search result object to local variables
		var lat = placeData.geometry.location.lat();  // latitude from the place service
		var lon = placeData.geometry.location.lng();  // longitude from the place service
		var name = placeData.formatted_address;   // name of the place from the place service
		var bounds = window.mapBounds;            // current boundaries of the map window

		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name
		});

		var infoWindow = new google.maps.InfoWindow({
			content: name
		});

		google.maps.event.addListener(marker, 'mouseover', function() {
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			infoWindow.close();
		});

		// this is where the pin actually gets added to the map.
		marker.setMap(map);
		map.setCenter(placeData.geometry.location);
		map.setZoom(10);
	}

	/*
	callback(results, status) makes sure the search returned results for a location.
	If so, it creates a new map marker for that location.
	*/
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		  createMapMarker(results[0]);
		}
	}

	/*
	pinPoster(locations) takes in the array of locations created by locationFinder()
	and fires off Google place searches for each location
	*/
	function pinPoster(locations) {

		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);

		// Iterates through the array of locations, creates a search object for each location
		for (var place in locations) {

			// the search request object
			var request = {
			query: locations[place]
			};

			// Actually searches the Google Maps API for location data and runs the callback
			// function with the search results after each search.
			service.textSearch(request, callback);
		}
	}

	// Sets the boundaries of the map based on pin locations
	//window.mapBounds = new google.maps.LatLngBounds();

	// locations is an array of location strings returned from locationFinder()
	locations = locationFinder();

	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
	//Make sure the map bounds get updated on page resize
	//map.fitBounds(mapBounds);
});
