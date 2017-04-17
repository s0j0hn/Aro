(function () {
  'use strict';

  angular
    .module('app.votes')
    .controller('VotesListController', VotesListController);

  VotesListController.$inject = ['VotesService'];

  function VotesListController(VotesService) {
    var vm = this;

    vm.votes = VotesService.query();
  }
}());
