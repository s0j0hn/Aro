'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','$localStorage','UsersService','$http',
    function ($scope, $state, Authentication, Menus, $localStorage, UsersService, $http) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.contacts = {};
        $scope.getContacts = function(){
            $http({
                method: 'GET',
                url: 'https://localhost:3434/user/contacts',
                headers : {
                    'Auth': 'test'
                }
            }).then(function successCallback(response) {

            }, function errorCallback(error) {
                console.log(error);
            });
        };

        function getcontacts() {
            UsersService.getContacts()
                .then(onGetContactsSuccess)
                .catch(onGetContactsError);
        }


        function onGetContactsSuccess(response) {

            console.log('Success get contacts');
            // swal('Success', 'Contacts get with success', 'success');
        }

        function onGetContactsError(response) {
            // swal('Error', response.data.status.description, 'error');
        }
    }
]);
