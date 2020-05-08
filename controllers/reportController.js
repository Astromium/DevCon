const Report = require('../models/reportModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.createReport = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('_id name photo slug');
    let reportBody = {};
    console.log(req.body.reportType);
    reportBody.reportType = req.body.reportType;
    if (req.body.post) reportBody.post = req.body.post;
    if (req.body.reasons) reportBody.reasons = req.body.reasons;
    reportBody.issuedAt = req.body.issuedAt;
    reportBody.status = req.body.status;
    reportBody.user = user;

    const report = await Report.create(reportBody);

    res.status(200).json({
        status: 'success',
        message: 'Report Sent to the admins',
        report
    })
});

exports.getAllReports = catchAsync(async (req, res, next) => {
    const reports = await Report.find();
    res.status(200).json({
        status: 'success',
        reports
    })
})