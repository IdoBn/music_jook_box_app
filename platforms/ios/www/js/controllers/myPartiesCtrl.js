angular.module('starter.controllers')
.controller('MyPartiesController', function($scope, Party, Auth) {
  $scope.title = 'My Parties';
  $scope.user = Auth.getUser();

  $scope.doRefresh = function() {
    Party.getUserParties(Auth.getUser().id).success(function(data) {
      console.log('user parties ', data);
      $scope.parties = data.user.parties;
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  Party.getUserParties(Auth.getUser().id).success(function(data) {
    console.log('user parties ', data);
    $scope.parties = data.user.parties;
  });
});