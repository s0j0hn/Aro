(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('app.users.services')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource', 'Authentication'];

    function UsersService($resource, Authentication) {
        var user = Authentication.user || null;
        var local = 'https://localhost\\:3434';
        var Users = $resource('/users', {}, {
            update: {
                method: 'PUT',
                headers:{

                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            logout:{
                method: 'GET',
                url: local + '/user/deauth',
                headers: {

                }
            },
            getconversations:{
                method: 'GET',
                url: local + '/user/conversations',
                headers: {

                }
            },
            getinvitaions:{
                method: 'GET',
                url: local + '/users/conversations/invitations',
                headers: {

                },
                params:{
                    username: '@username'
                }
            },
            getcontacts:{
                method: 'GET',
                url: local + '/user/contacts',

            },
            addcontacts:{
                method: 'POST',
                url: local + '/users/:username/contacts',
                headers: {

                },
                params:{
                    username: '@username'
                }
            },
            updatePassword: {
                method: 'POST',
                url: '/api/users/password'
            },
            signup: {
                method: 'POST',
                url: local + '/users',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            signin: {
                method: 'GET',
                url: 'https://localhost\\:3434/users/:username/:password',
                params:{
                    username: '@username', password: '@password'
                },

            }
        });

        angular.extend(Users, {
            changePassword: function (passwordDetails) {
                return this.updatePassword(passwordDetails).$promise;
            },
            userSignup: function (credentials) {
                return this.signup(credentials).$promise;
            },
            userSignin: function (credentials) {
                return this.signin(credentials).$promise;
            },
            addContacts: function (users) {
                return this.addcontacts(users).$promise;
            },
            getInvitations: function () {
                return this.getinvitaions().$promise;
            },
            getContacts: function () {
                return this.getcontacts().$promise;
            },
            getConversations: function () {
                return this.getconversations().$promise;
            },
            logOut: function () {
                return this.logout().$promise;
            }

        });

        return Users;
    }
}());
