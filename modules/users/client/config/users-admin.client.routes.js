(function () {
    'use strict';

    // Setting up route
    angular
        .module('app.users.admin.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

    function routeConfig($stateProvider, helper) {
        $stateProvider
            .state('app.admin.users', {
                url: '/users',
                templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
                controller: 'UserListController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Users List'
                },
                resolve: helper.resolveFor('datatables')
            })
            .state('app.admin.user', {
                url: '/users/:userId',
                templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
                controller: 'UserController',
                controllerAs: 'vm',
                resolve: {
                    userResolve: getUser
                },
                data: {
                    pageTitle: 'Edit {{ userResolve.username }}'
                }

            })
            .state('app.admin.user-edit', {
                url: '/users/:userId/edit',
                templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
                controller: 'UserController',
                controllerAs: 'vm',
                resolve: {
                    userResolve: getUser
                },
                data: {
                    pageTitle: 'Edit User {{ userResolve.username }}'
                }
            });

        getUser.$inject = ['$stateParams', 'AdminService'];

        function getUser($stateParams, AdminService) {
            helper.resolveFor('icons');
            return AdminService.get({
                userId: $stateParams.userId
            }).$promise;
        }
    }
}());
