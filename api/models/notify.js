// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Notify', new Schema({ 
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    email: String,
    status: String,
    created: { 
        type: Date,
        default: Date.now
    }
}));