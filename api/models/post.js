// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', new Schema({ 
    title: String,
    state: String, 
    region: String,
    category: String,
    location: String, 
    age: Number,
    body: String,
    email: String,
    files: [
        {
            url: Buffer,
        }
    ],
    created: { 
        type: Date,
        default: Date.now
    }
}));