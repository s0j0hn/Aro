(function () {
    'use strict';

    // Users directive used to force lowercase input
    angular
        .module('app.forum')
        .directive('numbers', lowercase);

    function lowercase() {
        var directive = {
            require: 'ngModel',
            link: link
        };

        return directive;

        function link(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (input) {
                return input ? input.toLowerCase() : '';
            });
            element.css('text-transform', 'lowercase');
        }
    }
}());
