rentHomeApp.controller('aboutController', function($scope, HomeService) {
    $scope.message = 'About!';
    //$scope.successMessage = "Item saved successfully";
    $scope.errorMessage = "Error saving item";
    $scope.getHomes = function (saveSuccessful) {
      $scope.homes = HomeService.homes.query();
    }

    $scope.getName = function () {
      $scope.message = "Hello " + $scope.txtName;
    }
});
