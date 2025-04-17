const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullname,
      role = "buyer",
      orderIds = [],
      reputationScore = 0,
      isOnline = false,
    } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_JWT)
    );

    // Tạo người dùng mới
    const newUser = await User.create({
      email,
      password: hashPassword,
      fullname,
      role,
      orderIds,
      reputationScore,
      isOnline,
    });

    // Trả về thông tin người dùng (không bao gồm mật khẩu)
    const userData = { ...newUser._doc, password: "not show" };
    return res.status(201).json({
      message: "User registered successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Trả về token và thông tin người dùng (không bao gồm mật khẩu)
    const userData = { ...user._doc, password: "not show" };
    return res.status(200).json({ token, user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Lấy tất cả người dùng, không bao gồm mật khẩu
    const users = await User.find().select("-password");

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { register, login, getAllUsers };
