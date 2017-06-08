(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('app.users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$localStorage'];

  function Authentication($localStorage) {
    var auth = {
      user: $localStorage.user || null
    };

    return auth;
  }
}());
