const catchAsyncError = require('../middleware/catchAsyncErrors')
const Test = require('../models/Test')


// exports.createTest = catchAsyncError(async (req, res, next) => {
//     const test = await Test.create(req.body);
//     res.status(200).json({ test });
// });

exports.findAllTest = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    const resultsPerPage = 2;
    const { department, name, testCode } = req.query;
    const test = await Test.aggregate([
        {
            $match: {
                $and: [
                    department ? { "department": department } : {},
                    name ? { "name": name } : {},
                    testCode ? { "testCode": testCode } : {},
                ]
            }
        },
        {
            $facet: {
                data: [{ $skip: (resultsPerPage) * (page - 1) }, { $limit: resultsPerPage }],
                metaData: [{ $count: "total" }],
            }
        }
    ])
    res.status(200).json({ test });
});

exports.deleteTest = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    let test = await Test.findOne({ _id: req.params.id });
    if (!test) {
        return next(new ErrorHandler("Test not Found", 404));
    }
    await Test.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
});

exports.updateTest = catchAsyncError(async (req, res, next) => {
    if (req.user.role == "User" || req.user.role === "Collector") {
        return res.json("You are not authorized !")
    }
    let test = await Test.findOne({ _id: req.params.id });
    if (!test) {
        return next(new ErrorHandler("Test not Found", 404));
    }
    await Test.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Updated Successfully!" });
});