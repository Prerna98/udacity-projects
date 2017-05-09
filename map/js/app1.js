var map; //global variable


// it loads the map and it calls the view model
function myMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 26.912434,
            lng: 75.787271
        },
        zoom: 21
    });
    ko.applyBindings(new view_model());

}

function err() {
    var x = document.getElementById('map').innerHTML;
    alert("oops!problem loading map");
}

//array of info of my markers
var locations = [{
        title: 'Rambagh palace',
        location: {
            lat: 26.898331,
            lng: 75.808562
        },
        selected: false,
        appear: true,
        id: "4bc7875893bdeee12e7c37ae"
    },
    {
        title: 'Amer Fort',
        location: {
            lat: 26.985487,
            lng: 75.851345
        },
        selected: false,
        appear: true,
        id: "4bb16be4f964a52063923ce3"
    },
    {
        title: 'Birla TEmple',
        location: {
            lat: 26.892161,
            lng: 75.815530
        },
        selected: false,
        appear: true,
        id: "4ce6a853d8be6a315cb25642"
    },
    {
        title: 'jai mahal palace',
        location: {
            lat: 26.912766,
            lng: 75.786256
        },
        selected: false,
        appear: true,
        id: "4bc7875393bdeee12a7c37ae"
    },
    {
        title: 'Raj Mandir theater',
        location: {
            lat: 26.915559,
            lng: 75.809894
        },
        selected: false,
        appear: true,
        id: "4c7940de20bb199cd3ee0d29"
    },
    {
        title: 'Jantar Mantar',
        location: {
            lat: 26.924762,
            lng: 75.824560
        },
        selected: false,
        appear: true,
        id: "4bb594102f70c9b668628430"
    },
    {
        title: 'world trade park',
        location: {
            lat: 26.854260,
            lng: 75.805000
        },
        selected: false,
        appear: true,
        id: "4d6ad44e7e3eba7a10a7ee4c"
    }

];

var view_model = function() {
    var self = this;
    self.list = []; // array of markers
    var bigInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {

        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            venueid: locations[i].id,
            selected: ko.observable(locations[i].selected),
            appear: ko.observable(locations[i].appear),

        });
        // Push the marker to our array of markers.
        self.list.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            self.click_marker(this);
        });
        bounds.extend(self.list[i].position);
    }
    // Extend the boundaries of the map for each marker

    map.fitBounds(bounds);

    self.find = ko.observable('');
    self.errorDisplay = ko.observable('');
    self.myfunc = function() { // when the user enter place of his choice it filters accprdingly

        var value = self.find();

        if (value.length !== 0) {
            for (var i = 0; i < self.list.length; i++) { // filtering the request
                if (self.list[i].title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    self.list[i].appear(true);
                    self.list[i].setMap(map);
                } else {
                    self.list[i].appear(false);
                    self.list[i].setMap(null);
                }

            }
        } else {
            for (var j = 0; j < self.list.length; j++) {
                self.list[j].appear(true);
                self.list[j].setMap(map);

            }
        }
        bigInfowindow.close(); // close the infowindow

    };
    self.makeBounce = function(marker) { //when user clicks it produce a bounce on the marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 600);
    };




    self.make = function(marker) { // when user clicks the marker it calls click marker 
        marker.addListener('ondblclick', function() {
            self.click_marker(marker);

        });
    };
    self.click_marker = function(mm) //when user clicks it calls makebounce and populateinfowindow
    {
        for (var i = 0; i < self.list.length; i++) {
            self.list[i].selected(false);

        }

        mm.selected(true);
        self.makeBounce(mm);
        populateInfoWindow(mm, bigInfowindow);


    }

    for (var k = 0; k < self.list.length; k++) {

        self.make(self.list[k]); // it calls the make and pass each marker
    }

};


// This function populates the infowindow when the marker is clicked. 
function populateInfoWindow(marker, infowindow) {
    //third party api-> 

    $.ajax({
        url: "https://api.foursquare.com/v2/venues/" + marker.venueid + '?client_id=M1JE5Z5E32GV1LGTG4EUTOKMVTTVMAQA1QR11FS0CB4F5A5A&client_secret=HQJ2TNDZG32TFYBIJVOBPQ12NDLEFXXDJTJSZ2SNCS5LWRGE&v=20170208',
        dataType: "json",
        success: function(meta) {
            var dis = meta.response.venue;
            // all the information we get has been stored in this variables
            var locstate = dis.location.state;
            loccountry = dis.location.country;
            loclat = dis.location.lat;
            loclng = dis.location.lng;
            locname = dis.name;
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent("<u><h3>" + marker.title + "</h3></u>" + "NAME=" + locname + "<br>" + "STATE=" + locstate + "<br>" + "COUNTRY=" + loccountry + "<br>" + "lat=" + loclat + "<br>" + "lng=" + loclng);
                infowindow.open(map, marker);
                infowindow.addListener('closeclick', function() {
                    infowindow.setMarker = null;
                });
            }
        },
        error: function(e) { // it will give error when ajax request fails
            alert("ajax request failed!");
        }

    });



}