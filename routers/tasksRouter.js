 const router = require('express').Router();

const db = require('../data/helpers/tasks-model.js');

router.get('/', async (req, res) => {
    try {
        const tasks = await db.find()
        if (tasks) {
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(500).json({ message: `Tasks could not be found ${error}.` })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db.findById(id)
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task with specified ID does not exist"})
        }
    } catch (error) {
        res.status(500).json({ message: `Task request failed ${error}.` });
    }
});

router.post('/', async (req, res) => {
    const task = req.body;
    try {
        const newTask = await db.create(task);
        if (newTask) {
            res.status(201).json(newTask);
        }
    } catch (error) {
        res.status(500).json({ message: `Your Task could not be created ${error} `})
    }
});



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db.remove(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "The task with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({
            message: `The task information could not be modified ${error}.`
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newTask = req.body;

    try {
        const editedTask = await db.update(newTask, id);
        if (editedTask) {
            res.status(200).json(editedTask)
        } else {
            res.status(404).json({
                message: "The Task with the specified ID does not exist."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `The Task information could not be modified ${error}.`
        });
    }
});

module.exports = router;
