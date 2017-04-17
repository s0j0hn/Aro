'use strict';

// Configuring the Articles module
angular.module('app.bans').run(['Menus',
    function (Menus) {

        // Add the dropdown create item
        Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'IP Bans',
            state: 'app.bans.list',
            roles: ['admin']
        });
    }
]);
