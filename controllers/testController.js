const catchAsyncError = require('../middleware/catchAsyncErrors')
const Test = require('../models/Test')


exports.createTest = catchAsyncError(async (req, res, next) => {
    const test = await Test.create(req.body);
    res.status(200).json({ test });
});

exports.deleteTest = catchAsyncError(async (req, res, next) => {
    let test = await Test.findOne({ _id: req.params.id });
    if (!test) {
        return next(new ErrorHandler("Test not Found", 404));
    }
    await Test.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
});

exports.updateTest = catchAsyncError(async (req, res, next) => {
    let test = await Test.findOne({ _id: req.params.id });
    if (!test) {
        return next(new ErrorHandler("Test not Found", 404));
    }
    await Test.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Updated Successfully!" });
});