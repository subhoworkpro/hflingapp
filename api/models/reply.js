// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Reply', new Schema({
    body: String,
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    status: String,
    created: { 
        type: Date,
        default: Date.now
    }
}));