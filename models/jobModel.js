const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    applicants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
})

jobSchema.pre('save', function (next) {
    this.populate({
        path: 'applicants',
        select: 'photo name slug cv',
    });
    next();
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;