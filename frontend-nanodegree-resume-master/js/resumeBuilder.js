/*
This is empty on purpose! Your code to build the resume will go here.
  var a="james and cherry";
  var b=a.replace("james","tom");
  console.log(a);
  console.log(b);*/
var work = {
    "jobs": [{
            "employer": "rythmic souls academy",
            "title": "choreographer",
            "dates": "2016",
            "description": "Choreographers create routines for individual performers, competitions, musical performances, marching bands, ballets and other spectacles. They create dance and movement routines, sometimes by revising or combining existing routines. Former dancers sometimes transition into choreography careers after their bodies have had enough of the physical demands involved in dancing.",
            "location": "delhi",
        },
        {
            "employer": "taj hotel",
            "title": "chef",
            "dates": "2017",
            "description": "Line cooks are responsible primarily for cooking the food along with the sous chefs, who are the head chef's second in command. Sous chefs cook, help out the head chef whenever needed and stand in for the head chef during an absence. A head chef or head cook is the kitchen boss.",
            "location": "mumbai",

        }
    ]

};
var projects = {
    "projects": [{

            "title": "project 1",
            "dates": "2013",
            "description": "Dance is a performance art form consisting of purposefully selected sequences of human movement. This movement has aesthetic and symbolic value, and is acknowledged as dance by performers and observers within a particular culture.[nb 1] Dance can be categorized and described by its choreography, by its repertoire of movements, or by its historical period or place of origin.",
            "images": ["dance1.jpeg"],
        },
        {
            "title": "project 2",
            "dates": "2013",
            "description": "Dance is generally, though not exclusively, performed with the accompaniment of music and may or may not be performed in time to such music. Some dance (such as tap dance) may provide its own audible accompaniment in place of (or in addition to) music. Many early forms of music and dance were created for each other and are frequently performed together. Notable examples of traditional dance/music couplings include the jig, waltz, tango, disco, and salsa. Some musical genres have a parallel dance form such as baroque music and baroque dance; other varieties of dance and music may share nomenclature but developed separately, such as classical music and classical ballet.",
            "images": ["dance2.jpeg"],

        }
    ]
};


var education = {
    "schools": [{
            "name": "st.xaviers convent school",
            "location": "bathinda",
            "degree": "masters",
            "majors": ["science"],
            "dates": "2012",



        },
        {
            "name": "lakshaya",
            "location": "patiala",
            "degree": "BA",
            "majors": ["maths"],
            "dates": "2013 - 14",

        }
    ],
    "onlineCourses": [{
        "title": "front end nanodegree",
        "school": "udacity",
        "dates": "2017",
        "url": "http://www.udacity.in",

    }],

};




var bio = {
    "name": "prerna joshi",
    "age": "20",
    "role": "web developer",
    "contacts": {
        "mobile": "1234567890",
        "email": "abc@gmail.com",
        "github": "prerna98",
        "twitter": "@joshiprerna",
        "location": "paris",
    },
    "welcomeMessage": "bonjour",
    "skills": ["dancer", "social worker", "activist"],
    "biopic": ["prerna.jpg"],

};
bio.display = function() {
    var formattedname = HTMLheaderName.replace("%data%", bio.name);
    //$("#header").prepend(formattedname);
    //var role = "web developer";
    var frole = HTMLheaderRole.replace("%data%", bio.role);
    $("#header").prepend(frole);
    $("#header").prepend(formattedname);

    var fmobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var femail = HTMLemail.replace("%data%", bio.contacts.email);
    var ftwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var fgithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var flocation = HTMLlocation.replace("%data%", bio.contacts.location);

    var pic = HTMLbioPic.replace("%data%", bio.biopic);
    var fmessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

    $("#topContacts,#footerContacts").append(fmobile, femail, ftwitter, fgithub, flocation);


    $("#header").append(pic, fmessage, HTMLskillsStart);



    bio.skills.forEach(function(p) {
        var fskills = HTMLskills.replace("%data%", p);
        $("#skills").append(fskills);

    });
};
bio.display();

work.display = function() {

    work.jobs.forEach(function(i) {
        $("#workExperience").append(HTMLworkStart);
        var femployer = HTMLworkEmployer.replace("%data%", i.employer);
        var ftitle1 = HTMLworkTitle.replace("%data%", i.title);
        var femployertitle = femployer + ftitle1;

        $(".work-entry:last").append(femployertitle);
        var fdates1 = HTMLworkDates.replace("%data%", i.dates);
        var flocation1 = HTMLworkLocation.replace("%data%", i.location);
        $(".work-entry:last").append(fdates1, flocation1);


        var fdesc1 = HTMLworkDescription.replace("%data%", i.description);

        $(".work-entry:last").append(fdesc1);

    });
};
work.display();

projects.display = function() {
    projects.projects.forEach(function(j) {
        $("#projects").append(HTMLprojectStart);

        var pname = HTMLprojectTitle.replace("%data%", j.title);

        var fdates = HTMLprojectDates.replace("%data%", j.dates);

        var fdesc = HTMLprojectDescription.replace("%data%", j.description);
        $(".project-entry:last").append(pname, fdates, fdesc);

        j.images.forEach(function(we) {
            var fimage = HTMLprojectImage.replace("%data%", we);
            $(".project-entry:last").append(fimage);

        });

    });
};

projects.display();

education.display = function() {
    education.schools.forEach(function(q) {

        $("#education").append(HTMLschoolStart);


        var fname = HTMLschoolName.replace("%data%", q.name);
        var fdegree = HTMLschoolDegree.replace("%data%", q.degree);
        var ftitle = fname + fdegree;


        var floc = HTMLschoolLocation.replace("%data%", q.location);




        var fdates = HTMLschoolDates.replace("%data%", q.dates);

        var fmajor = HTMLschoolMajor.replace("%data%", q.majors);
        $(".education-entry:last").append(ftitle, floc, fdates, fmajor);



    });
    $(".education-entry:last").append(HTMLonlineClasses);

    education.onlineCourses.forEach(function(val) {
        var ftitle = HTMLonlineTitle.replace("%data%", val.title);
        //$(".education-entry:last").append(ftitle);
        var fschool = HTMLonlineSchool.replace("%data%", val.school);
        var fschooltitle = ftitle + fschool;

        // $(".education-entry:last").append(fschooltitle);
        var fdates = HTMLonlineDates.replace("%data%", val.dates);
        //$(".education-entry:last").append(fdates);
        var furl = HTMLonlineURL.replace("%data%", val.url);
        $(".education-entry:last").append(fschooltitle, fdates, furl);
    });

};
education.display();




function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();
    return name[0] + " " + name[1];

}
$('#main').append(internationalizeButton);
$("#mapDiv").append(googleMap);