import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [150, "Age cannot exceed 150"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: "users" },
);

// Instance method example
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  return user;
};

// Static method example
userSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

const User = mongoose.model("User", userSchema);
export default User;
