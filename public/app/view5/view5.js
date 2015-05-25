/**
 * Created by Uffe on 25-05-2015.
 */
'use strict';

angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])
    .controller('View5Ctrl', ['$scope', '$http', function ($scope, $http) {
        $scope.makeReservation = function(Passengers, flightInstanceJson, URL, userName) {
            $http({
                method: 'POST',
                url: '/makeReservation/'
            })
                .success(function (data, status, headers, config) {
                    $scope.reserv = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }
    }]);