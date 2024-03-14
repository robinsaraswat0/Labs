const catchAsyncError = require('../middleware/catchAsyncErrors')
const Package = require('../models/Package')


exports.createPackage = catchAsyncError(async (req, res, next) => {
    const package = await Package.create({
        testId: req.body.testId,
        total: req.body.total,
        adminId: req.user.role === "Admin" ? req.user._id : req.user.adminId
    });
    res.status(200).json({ package });
});

exports.findAllPackage = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    const package = await Package.find({ admin_Id: req.user.role === "Admin" ? req.user._id : req.user.adminId });
    res.status(200).json({ package });
});

exports.deletePackage = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    let package = await Package.findOne({ _id: req.params.id });
    if (!package) {
        return next(new ErrorHandler("Sample not Found", 404));
    }
    if (package.adminId.toString() != req.user.role === "Admin" ? req.user._id.toString() : req.user.adminId.toString()) {
        return res.json("You are not authorized !")
    }
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
});

exports.updatePackage = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    let package = await Package.findOne({ _id: req.params.id });
    if (!package) {
        return next(new ErrorHandler("Sample not Found", 404));
    }
    if (package.adminId.toString() != req.user.role == "Admin" ? req.user._id.toString() : req.user.adminId.toString()) {
        return res.json("You are not authorized !")
    }
    await Package.findByIdAndUpdate(req.params.id, {
        testId: req.body.testId,
        total: req.body.total,
        adminId: req.user.role === "Admin" ? req.user._id : req.user.adminId
    });
    res.status(200).json({ message: "Updated Successfully!" });
});