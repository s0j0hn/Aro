'use strict';

angular.module('app.core').factory('tokenHttpRequestInterceptor', ['Authentication',
    function (Authentication) {
        return {
            request: function (config) {
                var user = Authentication.user;

                if (user && user.token) {
                    config.headers.auth = user.token;
                }

                return config;
            }
        };
    }]);
