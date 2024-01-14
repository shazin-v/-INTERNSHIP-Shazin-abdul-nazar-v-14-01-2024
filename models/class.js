const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  standard: { 
    type: String, 
    required: true 
},
  division: { 
    type: String, 
    required: true },
}
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
