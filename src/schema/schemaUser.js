const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const { Subscription } = require("../helpers/constants");
const gravatar = require('gravatar')

const SALT_FACTOR = 6;
const blogSchemaUser = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
        },
    email: {
      type: String,
      unique: [true, "The email must be unique"],
      required: [true, "Number phone is required"],
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: {
        values: [
          Subscription.START,
          Subscription.PROFESSIONAL,
          Subscription.BUISNESS,
        ],
        message: ["This type of subscription does not exist"],
      },
      default: Subscription.START,
    },
    token: {
      type: String,
      default: null,
    },
    avatar:{
      type: String,
      default: function (params) {
       return  gravatar.url(this.email, {s:'250'}, true)
      },
      idCloudAvatar:{
        type:String,
        default:null
      }

    }
  },

  { versionKey: false, timestamps: true }
);

blogSchemaUser.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

blogSchemaUser.methods.validPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
   return result
};
const User = mongoose.model("user", blogSchemaUser);

module.exports = User;
