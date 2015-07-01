'use strict';


angular.module('app', [
    'app.controllers','app.services','ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when("/home", {templateUrl: "./partials/home.html" }).
        when("/login", {templateUrl: "./partials/login.html" }).
    otherwise({redirectTo: '/login'});
}]);