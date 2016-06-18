rentHomeApp.controller('mainController', function($scope, HomeService) {
    $scope.message = 'Everyone come and see how good I look!';

    $scope.getHomes = function () {
        $scope.homes = HomeService.homes.query();
    }
});
