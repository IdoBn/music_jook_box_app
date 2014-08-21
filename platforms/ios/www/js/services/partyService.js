/**
* app.services Module
*
* Description
*/
angular.module('starter.services')
.factory('Party', ['$http', 'Auth', function($http, Auth){
  var URL = 'http://localhost:3000';

  function load(path) {
    return $http.get(URL + '/' + path);
  }

  return {
    getParties: function(coords) {
      // return load('parties');
      return $http({
        url: URL + '/parties',
        method: 'GET',
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      })
    },
    getUserParties: function(userId) {
      return $http({
        url: URL + '/users/' + userId,
        method: 'GET'
      });
    },
    getParty: function(id) {
      return load('parties/' + id);
    },
    search: function(id, songpull) {
      return $http({
        url: URL + '/parties/' + id + '/search',
        method: 'GET',
        params: {
          songpull: songpull
        }
      });
    },
    createRequest: function(song, partyId) {
      return $http({
        url: URL + '/requests',
        method: 'POST',
        data: {
          request: {
            title: song.title,
            author: song.author.name,
            url: song.player_url,
            party_id: partyId,
            thumbnail: song.thumbnails[0].url
          },
          user_access_token: Auth.getUser().access_token
        }
      });
    },
    setPlayed: function(id, coords) {
      return $http({
        url: URL + '/requests/'+ id +'/played',
        method: 'PATCH',
        data: {
          user_access_token: Auth.getUser().access_token,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      });
    }, 
    createParty: function(party) {
      return $http({
        url: URL + '/parties',
        method: 'POST',
        data: {
          party: {
            name: party.name,
            latitude: party.latitude,
            longitude: party.longitude
          },
          user_access_token: Auth.getUser().access_token
        }
      });
    },
    destroyParty: function(id) {
      return $http.delete(URL + '/parties/' + id, {
        params: {
          user_access_token: Auth.getUser().access_token 
        }
      });
    },
    likeRequest: function(id) {
      return $http({
        url: URL + '/requests/' + id + '/like',
        method: 'POST',
        data: {
          user_access_token: Auth.getUser().access_token
        }
      });
    },
    unlikeRequest: function(id) {
      return $http.delete(URL + '/requests/' + id + '/unlike', {
        params: {
          user_access_token: Auth.getUser().access_token
        }
      });
    },
    destroyRequest: function(id) {
      return $http.delete(URL + '/requests/' + id, {
        params: {
          user_access_token: Auth.getUser().access_token 
        }
      });
    }
  };
}]);