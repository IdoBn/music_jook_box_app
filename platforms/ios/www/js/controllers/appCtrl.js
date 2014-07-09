angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPlatform, Auth) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicPlatform.ready(function() {
    if (!Auth.getUser()) {
      $scope.modal.show();
    } else {
      $scope.user = Auth.getUser();
      console.log('scope.user', $scope.user);
    }
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var plugin = new CC.CordovaFacebook();
    plugin.init('1417458451820697', 'CordovaSample', ['email', 'public_profile']);
    plugin.login(function(result) {
      console.log(result);
      Auth.login({ 
        access_token: result.accessToken, 
        expires_in: result.expirationDate
      }).success(function(data) {
        console.log('user logedin', data);
        Auth.setUser(data);
        $scope.user = Auth.getUser();
        $scope.modal.hide();
      });
    });
  };
});