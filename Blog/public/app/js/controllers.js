/**
 * Created by Umer on 6/30/2015.
 */

angular.module('app.controllers', []).run(function ($rootScope) {
    $rootScope.loggedIn = false;
    $rootScope.isAuthenticated = function () {
        if ($rootScope.loggedIn == true)
            return true;
        else
            return false;
    }
}).controller('loginController', function ($rootScope, $scope, $location, $http) {

    $scope.submit = function () {
        $http.post('http://localhost:3030/login', $scope.formData).success(function (data) {
            $scope.loginWarn = false;
            if (data.logged == true) {
                $rootScope.loggedIn = true;
                $location.path('/home');
            } else {
                $scope.loginWarn = true;
            }
        });

    }
}).controller('registerController', function ($rootScope, $scope, $location, $http) {

    $scope.register = function () {
        $http.post('http://localhost:3030/register', $scope.register).success(function (data) {

            if (data.registered == true) {

                $location.path('/login');
            }
        });

    }
}).controller('writepostController', function ($rootScope, $location, $scope, $http) {

    if (!$rootScope.isAuthenticated()) {
        $location.path('/login');
    }

    //$scope.postData.title = '';
    //$scope.postData.blogpost = '';
    $scope.submitPost = function () {
        $http.post('http://localhost:3030/write', $scope.postData).success(function (data) {
            $scope.postData.title = '';
            $scope.postData.blogpost = '';
            $scope.loginWarn = false;
            if (data.logged == true) {
                $rootScope.loggedIn = true;
                $location.path('/home');
            } else {
                $scope.loginWarn = true;
            }
        });

    }
}).controller('logoutController', function ($rootScope, $scope, $location, $http) {

    $scope.logout = function () {

        $http.get('http://localhost:3030/logout').success(function (data) {
            console.log(data);
            if (data.loggedout == true) {
                $rootScope.loggedIn = false;
                $location.path('/login');
            }
        });
    }


}).controller('postController', function ($scope, $http) {
    $scope.records = false;
    $scope.blogPosts = {};
    var getPosts = function () {
        $http.get('http://localhost:3030/getpost').success(function (data) {
            if (data.records == false) {
                $scope.records = false;
            }
            else {
                $scope.records = true;
                $scope.blogPosts = data;
            }

        });
    }

    getPosts();
});