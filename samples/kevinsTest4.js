var app = angular.module('app', []);

app.controller("ChartController", function ($scope, $timeout) {
  $scope.counter = 0;

  $scope.title = "fault occurances";
  $scope.labels = ["fault code 1 really super long", "fault2", "fault3", "fault4",
             "fault5", "fault6", "fault7", "fault8", "fault9", "fault10", "fault11", "fault12"];
  $scope.data = [10, 9, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  $scope.onTimeout = function () {
    $scope.data[0] = $scope.counter++;
    mytimeout = $timeout($scope.onTimeout, 1000);
  }


  var mytimeout = $timeout($scope.onTimeout,1000);
});



