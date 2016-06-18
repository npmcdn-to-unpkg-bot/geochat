var rentHomeApp = angular.module('rentHomeApp', ['ngRoute', 'ngResource']);

rentHomeApp.directive("w3TestDirective", function() {
    return {
            template : "<h4>Made by a directive!</h4>"
    };
});

rentHomeApp.directive("frmLogin", function() {
  var formBuild = "<form>";
  formBuild += "<input type='text' ng-model='txtName' />";
  formBuild += "<input type='button' value='click' ng-click='getName()' />";
  formBuild += "</form>";
    return {
            template : formBuild
    };
});

rentHomeApp.directive("messageList", function () {
  return {
              restrict: 'E',
              scope: false,
              templateUrl: 'partials/messages.html'
         };
});

//rentHomeApp.config(function($routeProvider, $locationProvider) {
rentHomeApp.config(function($routeProvider) {
  $routeProvider
            .when('/', {
                templateUrl : 'partials/home.html',
                controller  : 'mainController'
            })
            .when('/about', {
                templateUrl : 'partials/about.html',
                controller  : 'aboutController'
            })
            .when('/contact', {
                templateUrl : 'partials/contact.html',
                controller  : 'contactController'
            });

            // use the HTML5 History API
            //$locationProvider.html5Mode(true);
});
