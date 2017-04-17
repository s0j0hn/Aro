(function () {
    'use strict';

    angular
        .module('app.bans')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

    function routeConfig($stateProvider, helper) {
        $stateProvider
            .state('app.bans', {
                abstract: true,
                url: '/bans',
                template: '<ui-view/>'
            })
            .state('app.bans.list', {
                url: '',
                templateUrl: 'modules/bans/client/views/list-bans.client.view.html',
                controller: 'BansListController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Bans List'
                },
                resolve: helper.resolveFor('datatables')
            })
            .state('app.bans.create', {
                url: '/create',
                templateUrl: 'modules/bans/client/views/form-ban.client.view.html',
                controller: 'BansController',
                controllerAs: 'vm',
                resolve: {
                    banResolve: newBan
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Bans Create'
                }
            })
            .state('app.bans.edit', {
                url: '/:banId/edit',
                templateUrl: 'modules/bans/client/views/form-ban.client.view.html',
                controller: 'BansController',
                controllerAs: 'vm',
                resolve: {
                    banResolve: getBan
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Ban {{ banResolve.name }}'
                }
            });
    }

    getBan.$inject = ['$stateParams', 'BansService'];

    function getBan($stateParams, BansService) {
        return BansService.get({
            banId: $stateParams.banId
        }).$promise;
    }

    newBan.$inject = ['BansService'];

    function newBan(BansService) {
        return new BansService();
    }
}());
