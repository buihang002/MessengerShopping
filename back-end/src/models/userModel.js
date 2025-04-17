const { Schema, model } = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    // orderIds: {
    //   type: [Schema.Types.ObjectId], // Mảng chứa các ID của các đơn hàng
    //   ref: "Order", // Giả sử bạn có mô hình Order
    // },
    // reputationScore: {
    //   type: Number,
    //   default: 0,
    //   min: 0,
    //   max: 5,
    // },
    // isOnline: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

// Tạo model User
const User = model("User", userSchema);

module.exports = User;
