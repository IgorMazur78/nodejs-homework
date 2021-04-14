const mongoose = require("mongoose");
const { Schema } = mongoose;

  const blogSchemaContact = new Schema({
name: {
    type:String,
    required: [ true, "Name is required"]
},
phone: {
    type:Number,
    required: [ true, "Number phone is required"],
    },
email: {
    type:String,
    unique: [true, "The email must be unique"],
    required: [ true, "Number phone is required" ]
},
shopCustomer: { type: Boolean, default: false},

  },
  {versionKey: false, timestamps:true});

  const Contact = mongoose.model("contact", blogSchemaContact)

  module.exports = Contact