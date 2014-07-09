angular.module('starter.services').
  factory('localStore', function(){
    return {
      get: function(str) {
        if (!localStorage.getItem(str)) {
          localStorage.setItem(str, angular.toJson(null)); 
        };
        return JSON.parse(localStorage.getItem(str));
      },
      set: function(str, items) {
        localStorage.setItem(str, angular.toJson(items));
      }
    };
  });