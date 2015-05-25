'use strict';

angular.module('myAppRename.view2punktum1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2punktum1', {
      templateUrl: 'app/view2/view2punktum1.html',
      controller: 'View2punktum1Ctrl'
    })

  }])
  .controller('View2punktum1Ctrl', function ($scope, $http, flyfabrikken, urlfabrikken) {
        $scope.setprimaryplane = function(flight){
            flyfabrikken.setFlight = flight;
        }
        $scope.flight = flyfabrikken.getFlight;
        $scope.Passengers = {Passengers:[]};
        $scope.addPassenger = function(firstName, lastName, city, country, street){
            var p = {firstName: firstName,
                     lastName: lastName,
                     city: city,
                     country: country,
                     street: street};
            $scope.Passengers.Passengers.push(p);
        }
        $scope.makeReservation = function(/* URL,*/ userName) {
            $http({
                method: 'POST',
                url: '/makeReservation/',
                body: {Passengers: $scope.Passengers,
                       flightInstanceJson: $scope.flight,
                       //URL: $scope.URL,
                       userName: userName,
                       json: true}
            })
                .success(function (data, status, headers, config) {
                    $scope.yay = data;
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
  });