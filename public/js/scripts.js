
$(document).ready(function () {
  google.maps.event.addDomListener(window, 'load', function () { initialize(geousers.data)} );

  var map, marker, localLat, localLon;

  $("#btnSearch").click(function () {
  if ($("#txtSearch").val() !== "") {
    $.ajax({
           url: "/users/search",
           data: { searchtext: $("#txtSearch").val() },
           type: "POST",
           beforeSend: function(xhr){xhr.setRequestHeader('apikey', '654321');},
           success: function(data) {
             initialize(data.data);
           }
        });
  }
  else {
    $.ajax({
           url: "/users",
           type: "POST",
           beforeSend: function(xhr){xhr.setRequestHeader('apikey', '654321');},
           success: function(data) {
             initialize(data.data);
           }
        });
  }
});

function initialize(users) {
  var locations = [];
  for(i = 0; i < users.length; i++) {
      var user = [];
      user[0] = users[i].firstname + " " + users[i].lastname;
      user[1] = users[i].latitude;
      user[2] = users[i].longitude;
      if (i === 0) {
        localLat = users[i].latitude;
        localLon = users[i].longitude;
      }

      locations.push(user)
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2,
    center: new google.maps.LatLng(localLat, localLon),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();
  var i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent("<a href='https://github.com/oczane/geochat' target='_blank'>" + locations[i][0] + "</a>");
        infowindow.open(map, marker);
      }
  })(marker, i));
  }
}
});
