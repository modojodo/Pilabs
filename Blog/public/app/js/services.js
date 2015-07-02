/**
 * Created by Umer on 6/30/2015.
 */



angular.module('app.services', []).
    factory('loginServices', function($http) {

        var loginService = {};

        loginService.post = function(URL) {
            console.log('post called');
            return $http.post({
                method: 'POST',
                url: URL
            }).success(function(data, status, headers, config) {
               console.log(data);
            });
        }

        loginService.getDriver = function(id) {
            return $http({
                method: 'GET',
                url: 'http://datastore.asadmemon.com/f1ranking/'+id
            });
        }
        return loginService;
    });