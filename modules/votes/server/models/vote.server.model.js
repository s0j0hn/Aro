'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Vote Schema
 */
var VoteSchema = new Schema({
    value: {
        type: Number,
        enum:[-1,0,1],
        required: 'Please fill Vote value'
    },
    description: {
        type: String,
        required: 'Please fill Vote description',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    recruit:{
      type: Schema.ObjectId,
      ref: 'Recruit'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Vote', VoteSchema);
