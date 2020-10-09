const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

//? creating a filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else
    cb(new AppError('Not an image! Please upload only images', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProjectImages = upload.fields([
  { name: 'thumbImage', maxCount: 1 },
  { name: 'images', maxCount: 6 },
]);

exports.resizeProjectImages = catchAsync(async (req, res, next) => {
  console.log('--------------');
  console.log(req.files);
  console.log('--------------');
  if (!req.files.thumbImage || !req.files.images) return next();

  // 1) Project Thumbnail
  const thumbImageName = `thumb-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.files.thumbImage[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/projects/${thumbImageName}`);

  req.body.thumbImage = thumbImageName;

  // 2) processing the images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, index) => {
      const filename = `project-${req.user._id}-${Date.now()}-${index +
        1}.jpeg`;

      await sharp(file.buffer)
        .resize(1500, 1000)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/projects/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getPersonalProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({ author: req.user._id });

  res.status(200).json({
    status: 'success',
    projects,
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const author = req.user._id;
  console.log(req.body);
  const { title, descriptionMarkdown, thumbImage, images } = req.body;
  const project = await Project.create({
    author,
    title,
    descriptionMarkdown,
    thumbImage,
    images,
  });

  res.status(201).json({
    status: 'success',
    project,
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const { title, descriptionMarkdown } = req.body;
  const project = await Project.findById(req.params.id);
  project.title = title;
  project.descriptionMarkdown = descriptionMarkdown;
  await project.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    message: 'Project Updated',
  });
});
