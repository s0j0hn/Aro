(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication'];

  function SettingsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
