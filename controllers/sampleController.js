const catchAsyncError = require('../middleware/catchAsyncErrors')
const Sample = require('../models/Sample')


exports.createSample = catchAsyncError(async (req, res, next) => {
    const sample = await Sample.create({
        user: req.body.user,
        adminId: req.user.role === "Admin" ? req.user._id : req.user.adminId,
        testId: req.body.testId,
        collectorId: req.body.collectorId,
        orgId: req.body.orgId,
        place: req.body.place,
        status: req.body.status,
        payment: req.body.payment,
    });
    res.status(200).json({ sample });
});

exports.findAllSample = catchAsyncError(async (req, res, next) => {
    const resultsPerPage = 2;
    const { name, status } = req.query;
    const sample = await Sample.aggregate([
        {
            $match: {
                $and: [
                    name ? { "user.name": name } : {},
                    status ? { "status": status } : {},
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
    res.status(200).json({ sample });
});

exports.deleteSample = catchAsyncError(async (req, res, next) => {
    let sample = await Sample.findOne({ _id: req.params.id });
    if (!sample) {
        return next(new ErrorHandler("Sample not Found", 404));
    }
    await Sample.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
});

exports.updateSample = catchAsyncError(async (req, res, next) => {
    let sample = await Sample.findOne({ _id: req.params.id });
    if (!sample) {
        return next(new ErrorHandler("Sample not Found", 404));
    }
    await Sample.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        adminId: req.user.role === "Admin" ? req.user._id : req.user.adminId,
        testId: req.body.testId,
        collectorId: req.body.collectorId,
        orgId: req.body.orgId,
        place: req.body.place,
        status: req.body.status,
        payment: req.body.payment,
    });
    res.status(200).json({ message: "Updated Successfully!" });
});