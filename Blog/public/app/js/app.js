'use strict';


angular.module('app', [
    'app.controllers', 'app.services', 'ngRoute'
]).
    config(['$routeProvider', function ($routeProvider, $rootScope) {
        $routeProvider.
            when("/home", {templateUrl: "./partials/home.html"}).
            when("/login", {templateUrl: "./partials/login.html"}).
            when("/register", {templateUrl: "./partials/register.html"}).
            when("/write", {templateUrl: "./partials/writePost.html"}).
            otherwise({redirectTo: '/home'});
    }]);