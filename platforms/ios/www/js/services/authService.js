angular.module('starter.services', []).
  factory('Auth', function($http, localStore){
    var currentUser = localStore.get('user');
    var URL = 'http://192.168.10.181:3000';
    return {
      login: function(params) {
        return $http({
          url: URL + '/sessions',
          method: 'POST',
          data: {
            access_token: params.access_token ,
            expires_in: params.expires_in
          }
        });
      },
      logout: function() {
        this.setCurrentUser(null);
      },
      setUser: function(user) {
        currentUser = user;
        localStore.set('user', currentUser);
      },
      getUser: function() {
        return currentUser;
      }
    };
  });