const express = require("express");

const userRouter = require("./userRoute.js");
const router = express.Router();

router.use("/", userRouter);

module.exports = router;
