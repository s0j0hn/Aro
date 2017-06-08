'use strict';

module.exports = {
    app: {
        AppTitle: 'Aro',
        AppDescription: 'AngularJs Web Chat with Ora',
        keywords: 'express, angularjs, node.js',
        googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'UA-',
        googleRecaptchaPublic: process.env.GOOGLE_RECAPTCHA_PUBLIC || '6L',
        googleRecaptchaSecret: process.env.GOOGLE_RECAPTCHA_SECRET || '6L',
        httpsPin:{
            pin1: 'HN',
            pin2: 'HN'
        },
        mongoEncryption:{
            activated: false,
            // It can be defined only ONCE !!
            // Or you have to decrypt all the data before you change this
            SecretKey: 'PdU2vusedclOAV8rQr'
        }
    },
    port: process.env.PORT || 3001,
    templateEngine: 'swig',
    // Session Cookie settings
    sessionCookie: {
        // session expiration is set by default to 48 hours
        maxAge: (8 * (60 * 60 * 1000)) * 2,
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: false,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false
    },
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'lKC7B+BopgsYJlGeSlOFU',
    // sessionKey is set to the generic sessionId key used by PHP applications
    // for obsecurity reasons
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    logo: 'modules/preloader/client/img/preloader.full.png',
    favicon: 'public/img/brand/favicon.ico',
    illegalUsernames: ['meanjs', 'administrator', 'password', 'admin', 'user',
        'unknown', 'anonymous', 'null', 'undefined', 'api','404team','support','404'
    ],
    uploads: {
        profile: {
            image: {
                dest: './modules/users/client/img/profile/uploads/',
                limits: {
                    fileSize: 2 * 1024 * 1024 // Max file size in bytes (1 MB)
                }
            }
        }
    },
    shared: {
        owasp: {
            allowPassphrases: true,
            maxLength: 128,
            minLength: 7,
            minPhraseLength: 20,
            minOptionalTestsToPass: 4
        }
    }
};
