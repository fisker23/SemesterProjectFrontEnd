'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'app/view2/view2.html',
      controller: 'View2Ctrl'
    }).when('/view2punktum2',{
        templateUrl:'app/view2/view2punktum1.html'
    });
  }])
  .controller('View2Ctrl', function ($scope, $http) {
        $scope.setprimaryplane = function(flight){
            $scope.plane = flight;
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