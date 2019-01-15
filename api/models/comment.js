// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Comment', new Schema({
    body: String,
    email: String,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
    status: String,
    created: { 
        type: Date,
        default: Date.now
    }
}));