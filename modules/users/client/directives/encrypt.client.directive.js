(function () {
    'use strict';

    // Users directive used to force lowercase input
    angular
        .module('app.users')
        .directive('encrypt', function(){
            return {
                require: 'ngModel',
                link: function(scope, elem, attrs, ngModel) {
                    ngModel.$parsers.push(function(value){
                        return sjcl.hash.sha256.hash(value);
                    });
                }
            };
        });

}());
