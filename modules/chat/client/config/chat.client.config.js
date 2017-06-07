'use strict';

// Configuring the app.chat module
angular.module('app.chat').run(['Menus',
    function (Menus) {
        // Add the app.chat dropdown item
        Menus.addMenuItem('sidebar', {
            title: 'Chat',
            state: 'app.chat.view',
            iconClass: 'fa fa-weixin',
            translate: 'sidebar.chat',
            type: 'item',
            roles: ['user','admin']
        });
        Menus.addMenuItem('sidebar', {
            title: 'Channels',
            state: 'app.chat.channels',
            type: 'item',
            iconClass: 'icon-cup',
            position: 9,
            roles: ['user','admin']
        });
        Menus.addMenuItem('sidebar', {
            title: 'Home',
            state: 'app.home',
            type: 'item',
            iconClass: 'icon-cup',
            position: 2,
            roles: ['*']
        });

    }
]);
