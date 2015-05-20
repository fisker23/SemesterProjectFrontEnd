'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'app/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
   $scope.getReservation = function(reservation) {
       $http({
           method: 'GET',
           url: 'http://libertyjet-team05.rhcloud.com/api/flights/' + reservation ,
           headers: {'Access-Control-*': 'http://libertyjet-team05.rhcloud.com'}
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