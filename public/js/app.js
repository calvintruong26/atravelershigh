var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: './views/pages/main.html',
        controller: 'mainController'
    })
    
    .when('/travel', {
        templateUrl: './views/pages/travel.html',
        controller: 'travelController'
    })
    
    .when("/travel/:id", {
        templateUrl: "./views/pages/post.html",
        controller: 'travelController'
    })
    
});


myApp.directive("navigationBar", function() {
   return {
       restrict: 'AECM',
       templateUrl: './views/directives/navigationbar.html',
       replace: true
   }
});


