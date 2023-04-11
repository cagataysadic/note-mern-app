const mongoose = require('mongoose')
const User = require('./User')

const projectSchema = new mongoose.Schema({
    title: String,
    progress: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;