// write a mongoose schema for the ship model and export it as Ship
const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    shipId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    captain: {
        type: String,
    },
    capacity: {
        type: Number,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    cargo: {
        type: String,
        required:true
    },
    
destination: {
        type: String,
    },

    portId: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending'
    },
    ledgerId: {
        type: String,
    },
    whoRegistered: {
        type: String,
    },
    orgCredentials: {
        type: String
    },
    shipAgencyId: {
        type: String,
        required: true
    }
    
});

const Ship = mongoose.model('Ship', shipSchema);

module.exports = Ship;

