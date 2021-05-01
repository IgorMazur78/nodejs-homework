const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const blogSchemaContact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: Number,
      required: [true, "Number phone is required"],
    },
    email: {
      type: String,
      unique: [true, "The email must be unique"],
      required: [true, "Number phone is required"],
    },
    shopCustomer: { type: Boolean, default: false },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);

blogSchemaContact.plugin(mongoosePaginate);

const Contact = mongoose.model("contact", blogSchemaContact);

module.exports = Contact;
