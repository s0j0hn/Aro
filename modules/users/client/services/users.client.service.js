(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('app.users.services')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource', 'Authentication'];

    function UsersService($resource, Authentication) {
        var user = {};
        var local = 'https://localhost\\:3434';
        if (Authentication.user){
            user = Authentication.user;
        }
        var Users = $resource('/api/users', {}, {
            update: {
                method: 'PUT',
                header:{
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            getInvitaions:{
                method: 'GET',
                url: local + '/users/conversations/invitations',
                header: {
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:{
                    username: '@username'
                }
            },
            getcontacts:{
                method: 'GET',
                url: local + '/user/contacts',
                header: {
                    'Auth': user.token,
                },

            },
            addcontacts:{
                method: 'POST',
                url: local + '/users/:username/contacts',
                header: {
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
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
            }
        });

        return Users;
    }
}());
