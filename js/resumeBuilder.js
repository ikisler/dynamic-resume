/*****
"Dynamic Resume" by Isabeau Kisler
Application shows a resume for the fictional character, Rainbow Dash.

Project created for Udacity's Front-End Nano-Degree using
jQuery and Google Maps API.

10/15
*****/

'use strict';

/*** Resume Content ***/
var rainbowDashBio = {
	"name": "Rainbow Dash",
	"role": "Representative of the Element of Loyalty",
	"welcomeMessage": "Hi there!  Welcome to my resume, built using jQuery.",
	"contact": {
		"location": "Ponyville, Equestria"
	},
	"skills": ["Speed", "Agility", "Guts", "Style", "Coolness", "Awesomness", "Radicalness"],
	"pic":"images/Rainbow_Dash_Wonderbolt_fantasy_cropped_S1E3.png"
};

var kislerBio = {
	"name": "Isabeau Kisler",
	"role": "Front-End Web Dev",
	"contact": {
		"email": "ikisler@csumb.edu",
		"github": "ikisler",
		"location": "Marysville, WA"
	}
};

var work = {
	"jobs": [{
		"employer": "City of Ponyville",
		"title": "Head of the Weather Patrol",
		"location": "Ponyville, Equestria",
		"dates": "October 2010 to Present",
		"description": [
			"Manage team of pegasus ponies to manage weather.",
			"Clear the sky of clouds in 10 seconds flat.",
			"Led a team of ponies to achieve 800 wing power in order to move water to Cloudsdale for storage."
		]
	},
	{
		"employer": "City of Ponyville",
		"title": "Winter Wrap Up Weather Team Lead",
		"location": "Ponyville, Equestria",
		"dates": "December 2010",
		"description": [
			"Lead team of ponies to help wrap up winter.",
			"Assisted other teams in their jobs.",
			"Melted snow using tornados."
		]
	}]
};

var projects = {
	"projects": [{
		"title": "Sonic Rainboom",
		"dates": "February 2011 to Present",
		"description": "Requiring great speed, a sonic rainboom is a rainbow-colored ring expanding from a point, and accompanied by a shockwave and a rainbow wake.",
		"images": ["images/Rainbow_Dash_doing_a_sonic_rainboom_3_S1E16_02.png"]
	},
	{
		"title": "Official Rainbow Dash Fan Club",
		"dates": "November 2011",
		"description": "A fan club devoted to me, Rainbow Dash.",
		"images": ["images/Rainbow_Dash_Fan_Club_S2E08_02.png"]
	}]
};

var education = {
	"schools": [{
		"name": "Wonderbolts Academy",
		"location": "Cloudsdale, Equestria",
		"degree": "Lead Pony",
		"majors": ["Wonderbolt Prep"],
		"dates": "Dec 2012",
		"url": ""
	}]
};

/*** Functions that add info to the page ***/
// Adds Bio Info
rainbowDashBio.display = function() {
	var formattedImage;
	var formattedWelcome;
	var formattedSkill;
	var formattedRole
	var skillsLen;

	// Add role
	if(rainbowDashBio.role) {
		formattedRole = HTMLheaderRole.replace("%data%", rainbowDashBio.role);
		$("#header").prepend(formattedRole);
	}

	// Add name
	if (rainbowDashBio.name) {
		var formattedName = HTMLheaderName.replace("%data%", rainbowDashBio.name);
		$('#header').prepend(formattedName);
	}

	// Add headshot
	formattedImage = HTMLbioPic.replace("%data%", rainbowDashBio.pic);
	$("#header").append(formattedImage);

	// Add welcome message
	formattedWelcome = HTMLwelcomeMsg.replace("%data%", rainbowDashBio.welcomeMessage);
	$("#header").append(formattedWelcome);

	// Add skills
	if (rainbowDashBio.skills.length > 0) {
		$("#header").append(HTMLskillsStart);

		skillsLen = rainbowDashBio.skills.length;
		for(var i=0; i<skillsLen; i++){
			formattedSkill = HTMLskills.replace("%data%", rainbowDashBio.skills[i]);
			$("#skills").append(formattedSkill);
		}
	}
};

// Adds Contact Info
rainbowDashBio.displayContactRainbowDash = function(divLocation) {
	var formattedLocation;

	$(divLocation).append(HTMLcontactStart);

	// Add location
	formattedLocation = HTMLlocation.replace("%data%", rainbowDashBio.contact.location);
	$(".contact:last").append(formattedLocation);
};

kislerBio.displayContactKisler = function(divLocation) {
	var formattedName;
	var formattedEmail;
	var formattedGithub;
	var formattedBlog;
	var formattedLocation;

	$(divLocation).append(HTMLcontactStart);

	// Add name
	formattedName = HTMLfooterName.replace("%data%", kislerBio.name);
	$(".contact:last").append(formattedName);

	// Add email
	formattedEmail = HTMLemail.replace("%data%", kislerBio.contact.email);
	$(".contact:last").append(formattedEmail);

	// Add github
	formattedGithub = HTMLgithub.replace("%data%", kislerBio.contact.github);
	$(".contact:last").append(formattedGithub);

	// Add location
	formattedLocation = HTMLlocation.replace("%data%", kislerBio.contact.location);
	$(".contact:last").append(formattedLocation);
};

// Adds Work Info
work.display = function () {
	var formattedEmployer;
	var formattedTitle;
	var formattedDates;
	var formattedLocation;
	var formattedDescription;
	var jobsLen;
	var descLen;

	jobsLen = work.jobs.length;
	for(var i=0; i<jobsLen; i++) {
		// Add Employer and Title
		$("#workExperience").append(HTMLworkStart);
		formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
		formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
		$(".work-entry:last").append(formattedEmployer + formattedTitle);

		// Add Date
		formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
		$(".work-entry:last").append(formattedDates);

		// Add Location
		formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
		$(".work-entry:last").append(formattedLocation);

		// Add Description
		$(".work-entry:last").append(HTMLworkDescriptionStart);

		descLen = work.jobs[i].description.length;
		for(var j=0; j<descLen; j++)
		{
			formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description[j]);
			$(".work-description:last").append(formattedDescription);
		}
	}
};

// Adds Project Info
projects.display = function() {
	var formattedTitle;
	var formattedDates;
	var formattedDescription;
	var formattedImage;
	var projectLen;
	var imagesLen;

	projectLen = projects.projects.length;
	for(var i=0; i<projectLen; i++) {
		// Add Project section
		$("#projects").append(HTMLprojectStart);

		// Add Title
		formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
		$(".project-entry:last").append(formattedTitle);

		// Add Dates
		formattedDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
		$(".project-entry:last").append(formattedDates);

		// Add Description
		formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
		$(".project-entry:last").append(formattedDescription);

		if(projects.projects[i].images.length > 0) {

			imagesLen = projects.projects[i].images.length;

			for(var j=0; j<imagesLen; j++) {
				formattedImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
				$(".project-entry:last").append(formattedImage);
			}
		}

	}
};

// Adds Education Info
education.display = function() {
	var formattedName;
	var formattedDegree;
	var formattedDates;
	var formattedLocation;
	var formattedMajor;
	var formattedTitle;
	var formattedSchool;
	var formattedURL;
	var schoolsLen;
	var onlineLen;

	// Add colleges
	schoolsLen = education.schools.length;
	for(var i=0; i<schoolsLen; i++) {

		$("#education").append(HTMLschoolStart);

		formattedName = HTMLschoolName.replace("%data%", education.schools[i].name).replace("#", education.schools[i].url);
		formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
		$(".education-entry:last").append(formattedName + formattedDegree);

		formattedDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
		formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
		$(".education-entry:last").append(formattedDates + formattedLocation);

		formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors);
		$(".education-entry:last").append(formattedMajor);


	}
};

/*** Call Functions to Display Content ***/
rainbowDashBio.displayContactRainbowDash("#header");

rainbowDashBio.display();

work.display();

projects.display();

education.display();

/*** Add Map ***/
$("#mapDiv").append(googleMap);

/*** Footer Contacts ***/
kislerBio.displayContactKisler("#footerContacts");

/*** Toggle Content Sections Open/Close ***/
$(function() {
	// Start with sections closed
	$(".work-entry").toggle();
	$(".project-entry").toggle();
	$(".education-entry").toggle();
	$("#map").toggle();

	// Event handlers which open the sections when they are clicked
	$("#workExperience").click(function() {
		$(".work-entry").toggle();
	});

	$("#projects").click(function() {
		$(".project-entry").toggle();
	});

	$("#education").click(function() {
		$(".education-entry").toggle();
	});

    $("#map-title-container").click(function() {
        $("#map").toggle();

        // Adjusts the div height based on whether the map is displayed
        if($("#map").css("display") ==="none") {
    		$("#mapDiv").css("height","100px");
    	} else {
    		$("#mapDiv").css("height","350px");
    	}

    	initializeMap();
    });
});