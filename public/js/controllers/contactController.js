rentHomeApp.controller('contactController', function($scope, HomeService) {
    $scope.message = 'Contact';

    $scope.getHomes = function () {
        $scope.homes = HomeService.homes.query();
    }
});
