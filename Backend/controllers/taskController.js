const Task = require('../models/taskModel');

const getTask = async (req, res) => {
    try{
        const task = await Task.findAll();
        res.json(task);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const createTask = async (req, res) => {
    try{
        const { title, description, status } = req.body;
        const newTask = await Task.create({ title, description, status });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error});
    }
    };

    const updateTask = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, status } = req.body;
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: 'Task not found'});
            }
            task.title = title;
            task.description = description;
            task.status = status;
            await task.save();

            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error updating the task', error})
        }

    };

    const deleteTask = async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({message: 'Task not found '});

            }

            await task.destroy();
            res.json({ message: 'Task deleted syccessfully' });

        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error});
        }

    };

    module.exports = { getTask, createTask, updateTask, deleteTask };

