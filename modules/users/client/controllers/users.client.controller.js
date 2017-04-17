'use strict';

angular.module('app.users').controller('UsersProfileController', ['$scope', '$state', 'Authentication', 'UsersProfile', 'userResolve',
    function ($scope, $state, Authentication, UsersProfile, userResolve) {
        $scope.authentication = Authentication;
        // Find existing user
        $scope.user = userResolve;
    }
]);
