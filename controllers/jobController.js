const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');

exports.createJob = catchAsync(async (req, res, next) => {
  let jobBody = {};
  if (req.body.title) jobBody.title = req.body.title;
  if (req.body.description) jobBody.description = req.body.description;
  if (req.body.jobLocation) jobBody.jobLocation = req.body.jobLocation;
  jobBody.author = req.user.id;

  const job = await Job.create(jobBody);

  res.status(200).json({
    status: 'success',
    job,
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const updatedjob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    job: updatedjob,
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Job deleted',
  });
});

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({
    status: 'success',
    jobs,
  });
});

exports.getjob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    job,
  });
});

exports.searchJob = catchAsync(async (req, res, next) => {
  const query = req.params.query
  const jobs = await Job.find({ $or: [{ 'title': { '$regex': query, '$options': 'i' } }, { 'description': { '$regex': query, '$options': 'i' } }] }).sort('-createdAt')

  res.status(200).json({
    status: 'success',
    length: jobs.length,
    jobs
  })
})
