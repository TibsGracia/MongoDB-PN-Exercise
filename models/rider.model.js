const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rider model
let RiderSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    score: {type: [Number], required: false},
});

// Export the Rider model
module.exports = mongoose.model('Rider', RiderSchema);
