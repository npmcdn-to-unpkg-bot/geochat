function search (users) {
  console.log("hello search");
  google.maps.event.addDomListener(window, 'load', function () { initialize(users) } );
}

var app = angular.module('geoChat', []);

app.controller('myCtrl', function($scope, $http, $window) {
  var req = {
              method: 'POST',
              url: '/users',
              headers: {
                        'apikey': '654321'
              }/*,
              data: { UserId: '576fa6067959e4b8299705ef' }*/
  }

$http(req).then(function mySucces(response) {
        $scope.users = response.data;
        $window.geousers = $scope.users;
    }, function myError(response) {
        $scope.users = response.statusText;
    });

});
