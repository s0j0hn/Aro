(function () {
    'use strict';

    angular
        .module('app.users.admin')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];

    function UserController($scope, $state, $window, Authentication, user) {
        var vm = this;

        vm.authentication = Authentication;
        vm.user = user;
        vm.remove = remove;
        vm.update = update;
        vm.isContextUserSelf = isContextUserSelf;

        function remove(user) {
            if ($window.confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();

                    vm.users.splice(vm.users.indexOf(user), 1);
                    Notification.success('User deleted successfully!');
                } else {
                    vm.user.$remove(function () {
                        $state.go('app.admin.users');
                        //Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
                    });
                }
            }
        }

        function update(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            var user = vm.user;
            if (user.roles.indexOf('admin') >= 0) {
                user.rank = 'Administrator';
            } else if (user.roles.indexOf('team') >= 0){
                user.rank = 'Team Member';
            }

            user.$update(function () {
                $state.go('app.admin.user', {
                    userId: user._id
                });
                //Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
            }, function (errorResponse) {
                //Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
            });
        }

        function isContextUserSelf() {
            return vm.user.username === vm.authentication.user.username || vm.user.roles.indexOf('admin') >= 0;
        }
    }
}());
