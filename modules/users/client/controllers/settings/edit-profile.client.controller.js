(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['$scope', 'UsersService', 'Authentication'];

    function EditProfileController($scope, UsersService, Authentication, SweetAlert) {
        var vm = this;

        vm.user = Authentication.user;
        vm.updateUserProfile = updateUserProfile;


        // Update a user profile
        function updateUserProfile(isValid) {

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            var user = new UsersService(vm.user);

            user.$update(function (response) {
                $scope.$broadcast('show-errors-reset', 'vm.userForm');

                swal('Success', 'Profile Edited!', 'success');

                Authentication.user = response;
            }, function (response) {
                swal('Cancelled', 'Edit profile failed!' + response.toString(), 'error');
            });
        }
    }
}());
