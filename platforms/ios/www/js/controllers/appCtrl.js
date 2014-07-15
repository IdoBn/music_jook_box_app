angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPlatform, Auth) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = Auth.getUser();
});