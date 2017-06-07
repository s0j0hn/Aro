'use strict';

angular.module('app.users').controller('UsersProfileController', ['$scope', '$state', 'Authentication', 'UsersProfile', 'userResolve','$localStorage',
    function ($scope, $state, Authentication, UsersProfile, userResolve, $localStorage) {
        $scope.authentication = Authentication;
        // Find existing user
        $scope.user = userResolve;
    }
]);
