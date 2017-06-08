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
            position: 2,
            roles: ['user','admin']
        });
        Menus.addMenuItem('sidebar', {
            title: 'Channels',
            state: 'app.chat.channels',
            type: 'item',
            iconClass: 'icon-cup',
            translate: 'sidebar.channels',
            position: 9,
            roles: ['user','admin']
        });
        Menus.addMenuItem('sidebar', {
            title: 'Home',
            state: 'app.home',
            type: 'item',
            iconClass: 'fa fa-home',
            translate: 'sidebar.home',
            position: 1,
            roles: ['*']
        });

    }
]);
