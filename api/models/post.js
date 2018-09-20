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
    status: String,
    haircolor: String,
    height: String,
    ethnicity: String,
    orientation: String,
    bodytype: String,
    eyecolor: String,
    mstatus: String,
    gender: String,
    bodyhair: String,
    hivstatus: String,
    weight : Number,
    mage : Number,
    files: [
        {
            url: String,
            public_id: String,
            version: String,
            signature: String,
            width: String,
            height: String,
            format: String,
            resource_type: String,
            created_at: String,
            bytes: String,
            tags: [],
            etag: String,
            placeholder: String,
            secure_url: String
        }   
    ],
    created: { 
        type: Date,
        default: Date.now
    }
}));