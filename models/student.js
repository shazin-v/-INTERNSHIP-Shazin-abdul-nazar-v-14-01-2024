const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
   },


  age: {
    type: Number,
    required: [true, "please enter your age"],
  },

  email: String,
},
{
    timestamps: true,
    }  
);


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;