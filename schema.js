const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      "Name": {
        "type": "String"
      },
      "Age": {
        "type": "Number"
      },
      "Password": {
        "type": "String"
      }
    },
    { versionKey: false }
  );
  
  // mongoose model
  const Student = mongoose.model('student',userSchema,'Students');

  module.exports = Student;