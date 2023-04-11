const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middlewares/authendicateToken');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.userId });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { title, progress } = req.body;
    const project = await Project({ title, progress, userId: req.user.userId });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, progress } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { title, progress }, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;