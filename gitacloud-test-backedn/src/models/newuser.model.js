const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Setup user schema
const NewUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    timestamps: true
  }
);

NewUserSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const NewUserModel = mongoose.model("newusers", NewUserSchema);
module.exports = { NewUserModel };
