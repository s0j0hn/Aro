'use strict';

// Configuring the app.chat module
angular.module('app.chat').run(['Menus',
    function (Menus) {
        // Add the app.chat dropdown item
        Menus.addMenuItem('sidebar', {
            title: 'Chat',
            state: 'app.chat',
            iconClass: 'fa fa-weixin',
            translate: 'sidebar.chat',
            type: 'item',
            roles: ['user','admin','team']
        });
    }
]);
