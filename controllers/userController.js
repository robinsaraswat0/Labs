const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.find({ $or: [{ mobile: req.body.mobile }, { email: req.body.email }, { username: req.body.username }] })

    if (user) {
        next(new ErrorHandler("User already Exist", 401))
    }
    if (req.user) {
        req.body[adminId] = req.user.role === "Admin" ? req.user._id : req.user.adminId
    }
    else req.body[role] = "Admin";
    user = await User.create(req.body)

    res.status(200).json({
        success: true,
        user
    })

})

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { role, mobile, username, password } = req.body;
    let user = {};
    if (role === "organisation") {
        user = await User.findOne({ username })

        if (!user) {
            next(new ErrorHandler("User does not exist", 404))
        }

        const isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }

        return sendToken(user, 200, res)
    }

    user = await User.find({ mobile })
    if (!user) {
        return next(new ErrorHandler("User doest not exist", 404))
    }

    //otp code

    sendToken(user, 200, res)
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
})


exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ adminId: req.user.role === "Admin" ? req.user._id : req.user.adminId });

    res.status(200).json({
        success: true,
        users
    });
})


exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User Doesnt Exist with ID:${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    });
})


exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);


    if (!user) {
        return next(new ErrorHandler(`User Doesnt Exist with ID: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
})