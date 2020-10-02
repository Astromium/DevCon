const mongoose = require('mongoose')
const marked = require('marked')
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);

const projectSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    descriptionMarkdown: {
        type: String,
        required: true
    },
    descriptionHtml: {
        type: String
    },
    thumbImage: {
        type: String,
        required: true
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

projectSchema.pre('save', function (next) {
    if (!this.descriptionMarkdown) return
    this.descriptionHtml = domPurify.sanitize(marked(this.descriptionMarkdown))
    next()
})


const Project = mongoose.model('Project', projectSchema)
module.exports = Project