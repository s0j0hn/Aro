(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$window', 'Authentication', 'PasswordValidator','$log','$http','$localStorage'];

    function AuthenticationController($scope, $state, UsersService, $window, Authentication, PasswordValidator, $log, $http, $localStorage) {
        var vm = this;

        vm.authentication = Authentication;
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
        vm.signup = signup;
        vm.signin = signin;
        vm.logout = logout;
        vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
        vm.setWidgetId = setWidgetId;
        vm.setResponse = setResponse;
        vm.cbExpiration = cbExpiration;
        vm.widgetId = null;
        vm.recaptchatResponse = null;

        // Get an eventual error defined in the URL query string:
        //if ($location.search().err) {
        //Notification.error({ message: $location.search().err });
        //}

        // If user is signed in then redirect back app.articles.list
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

            //hash the password before send
            vm.credentials.password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(vm.credentials.password));
            $log.debug(vm.credentials.password);

            vm.credentials = {
                user: {
                    username: vm.credentials.username,
                    password: vm.credentials.password.toUpperCase(),
                    email: vm.credentials.email
                }
            };

            UsersService.userSignup(vm.credentials)
                .then(onUserSignupSuccess)
                .catch(onUserSignupError);
        }

        function signin(isValid) {

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            UsersService.userSignin({username: vm.credentials.username,
                password: (sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(vm.credentials.password))).toUpperCase()})
                .then(onUserSigninSuccess)
                .catch(onUserSigninError);
        }

        function logout() {

            UsersService.logout()
                .then(onLogoutSuccess)
                .catch(onLogoutSuccess);
        }

        // Authentication Callbacks

        function onUserSignupSuccess(response) {
            // If successful we assign the response to the global user model
            //vm.authentication.user = response;
            //Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
            // And redirect to the previous or app.articles.list page
            $state.go($state.previous.state.name || 'page.authentication.signin', $state.previous.params);
            swal('Success', 'Inscription : ' + response.data.name, ' avec success');
        }

        function onUserSignupError(response) {
            //Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
            swal('Error', response.data.status.description, 'error');
        }

        function onUserSigninSuccess(response) {
            // If successful we assign the response to the global user model
            vm.authentication.user = response.data;
            vm.authentication.user.username = response.data.name;
            vm.authentication.user.profileImageURL = 'modules/users/client/img/profile/default.png';
            // $localStorage.set('user', response.data);
            vm.authentication.user.roles = ['user'];

            // And redirect to the previous or app.home page
            $state.go($state.previous.state.name || 'app.home', $state.previous.params);
            swal('Success', 'Welcome  ' + response.data.name, 'success');
        }

        function onUserSigninError(response) {
            //Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
            swal('Error', response.data.status.description, 'error');
        }

        function onLogoutSuccess(response) {

            // And redirect to the previous or app.home page
            $state.go($state.previous.state.name || 'app.home', $state.previous.params);
            swal('Success', 'Welcome  ' + response.data.name, 'success');
        }

        function onLogoutError(response) {
            swal('Error', response.data.status.description, 'error');
        }
    }
}());
