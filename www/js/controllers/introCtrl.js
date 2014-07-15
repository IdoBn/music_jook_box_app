angular.module('starter.controllers')
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, Auth) {
  // Called to navigate to the main app
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.doLogin = function() {
    var plugin = new CC.CordovaFacebook();
    plugin.init('1417458451820697', 'Music', ['email', 'public_profile']);
    plugin.login(function(result) {
      console.log(result);
      Auth.login({ 
        access_token: result.accessToken, 
        expires_in: result.expirationDate
      }).success(function(data) {
        console.log('user logedin', data);
        Auth.setUser(data);
        $state.go('app.parties');
      });
    });
  }
});