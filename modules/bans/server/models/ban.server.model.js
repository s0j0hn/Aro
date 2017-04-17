'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateAddress = function(address) {
    var addressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/;
    return (address && addressRegex.test(address));
};



/**
 * Ban Schema
 */
var BanSchema = new Schema({
    address: {
        type: String,
        validate: [validateAddress, 'Please fill Ban Address example: 192.168.1.66/32; single ip or search for subnet calculator'],
        required: 'Please fill Ban Address example: 192.168.1.66/32 single ip',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Ban', BanSchema);
