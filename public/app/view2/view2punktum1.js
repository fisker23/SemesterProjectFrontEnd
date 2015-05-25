'use strict';

angular.module('myAppRename.view2punktum1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2punktum1', {
      templateUrl: 'app/view2/view2punktum1.html',
      controller: 'View2punktum1Ctrl'
    })

  }])
  .controller('View2punktum1Ctrl', function ($scope, $http, flyfabrikken) {
        $scope.setprimaryplane = function(flight){
            flyfabrikken.setFlight = flight;
        }
        $scope.flight = flyfabrikken.getFlight;
        $scope.Passengers = [];
        $scope.addPassenger = function(firstName, lastName, city, country, street){
            var p =
        }
   $scope.getAvailableFlights = function(airport,date) {
       $http({
           method: 'GET',
           url: '/getflights/' + airport + "/"+date
       })
           .success(function (data, status, headers, config) {
               $scope.error = null;
               $scope.flights = data;
               console.log(data+"KAGE");
           }).
           error(function (data, status, headers, config) {
               if (status == 401) {
                   $scope.error = "You are not authenticated to request these data";
                   return;
               }
               $scope.error = data;
           });
   }
  });