(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$window', 'Authentication', 'PasswordValidator'];

    function AuthenticationController($scope, $state, UsersService, $window, Authentication, PasswordValidator) {
        var vm = this;

        vm.authentication = Authentication;
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
        vm.signup = signup;
        vm.signin = signin;
        vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
        vm.setWidgetId = setWidgetId;
        vm.setResponse = setResponse;
        vm.cbExpiration = cbExpiration;
        vm.widgetId = null;
        vm.recaptchatResponse = null;


        // If user is signed in then redirect back to chat
        if (vm.authentication.user) {
            $state.go('app.home');
        }

        function setWidgetId(widgetId) {
            vm.widgetId = widgetId;
        }


        function setResponse(response) {
            vm.recaptchatResponse = response;
        }
        
        function cbExpiration() {
            
        }

        function signup(isValid) {

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            UsersService.userSignup(vm.credentials, vm.recaptchatResponse)
                .then(onUserSignupSuccess)
                .catch(onUserSignupError);
        }

        function signin(isValid) {

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            UsersService.userSignin(vm.credentials)
                .then(onUserSigninSuccess)
                .catch(onUserSigninError);
        }

        // Authentication Callbacks

        function onUserSignupSuccess(response) {
            // If successful we assign the response to the global user model
            vm.authentication.user = response;
            //Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
            // And redirect to the previous or app.articles.list page
            $state.go($state.previous.state.name || 'app.home', $state.previous.params);
            swal('Success', 'Welcome  ' + response.username, 'success');
        }

        function onUserSignupError(response) {
            //Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
            swal('Error', response.data.message, 'error');
        }

        function onUserSigninSuccess(response) {
            // If successful we assign the response to the global user model
            vm.authentication.user = response;
            //Notification.info({ message: 'Welcome ' + response.firstName });
            // And redirect to the previous or app.articles.list page
            // $state.go($state.previous.state.name || 'app.chat', $state.previous.params);
            $state.go('app.home', $state.previous.params || $state.previous.state.name);
            swal('Success', 'Welcome  ' + response.username, 'success');
        }

        function onUserSigninError(response) {
            //Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
            swal('Error', response.data.message, 'error');
        }
    }
}());
