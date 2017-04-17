'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('app.users', ['core']);
ApplicationConfiguration.registerModule('app.users.services', ['core']);
ApplicationConfiguration.registerModule('app.users.admin.services', ['core']);
ApplicationConfiguration.registerModule('app.users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('app.users.admin.routes', ['core.admin.routes']);
