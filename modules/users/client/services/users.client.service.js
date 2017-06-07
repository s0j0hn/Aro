(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('app.users.services')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource', 'Authentication'];

    function UsersService($resource, Authentication) {
        var user = {};
        var local = 'http://localhost\\:3434';
        if (Authentication.user){
            user = Authentication.user;
        }
        var Users = $resource('/api/users', {}, {
            update: {
                method: 'PUT',
                header:{
                    'Auth': user.token
                }
            },
            updatePassword: {
                method: 'POST',
                url: '/api/users/password'
            },
            signup: {
                method: 'POST',
                url: local + '/users',

            },
            signin: {
                method: 'GET',
                url: 'http://localhost\\:3434/users/:username/:password',
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
            }
        });

        return Users;
    }


    // angular
    //     .module('app.users.admin.services')
    //     .factory('AdminService', AdminService);
    //
    // AdminService.$inject = ['$resource'];
    //
    // function AdminService($resource) {
    //     return $resource('/api/users/:userId', {
    //         userId: '@_id'
    //     }, {
    //         update: {
    //             method: 'PUT'
    //         }
    //     });
    // }
}());
