import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../Schemas/TaskModel.js';
import data from '../data.js';

const  Task1= express.Router();

//database seed
Task1.get('/seed', expressAsyncHandler(async (req, res) => {
    await Task1.remove({});
    const createdTasks = Task1.insertMany(data.tasks);
    res.send({createdTasks});
}));

Task1.get('/', expressAsyncHandler(async (req, res) => {
    const tasks = await Task1.find({});
    res.send({tasks});
}));

// Task1.get('/importanceDescending', expressAsyncHandler(async (req, res) => {
//     const tasks = await Task1.find().sort({ "priority": -1 });
//     res.send({ tasks });
// }));

Task1.get('/importanceAscending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task1.find().sort({ "priority": 1 });
    res.send({ tasks });
}));

Task1.get('/dateDescending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task1.find().sort({ "date": 1 });
    res.send({ tasks });
}));

Task1.get('/dateAscending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task1.find().sort({ "date": -1 });
    res.send({ tasks });
}));

Task1.get('/typeAlphabetical', expressAsyncHandler(async (req, res) => {
    const tasks = await Task1.find().sort({ "type": 1 });
    res.send({ tasks });
}))

Task1.get('/:id', expressAsyncHandler(async (req, res) => {
    const task = await Task1.findById(req.params.id);
    res.send({task});
}))

Task1.post('/', expressAsyncHandler(async (req, res) => {
    const task = new Task1({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        priority: req.body.priority,
        isComplete: req.body.isComplete,
        date: req.body.date,
    });
    const createdTask = await task.save();
    res.send("Task Created successfully" );
}))

Task1.put('/update', expressAsyncHandler(async (req, res) => {
    const task = await Task1.findById(req.body._id);
    if (task) {
        task.isComplete = req.body.isComplete;
        const updatedTask = await task.save();
        res.send("Task completed");
    } 
}))

Task1.put('/edit', expressAsyncHandler(async (req, res) => {
    const task = await Task1.findById(req.body._id);
    if (task) {
        task.name = req.body.name || task.name;
        task.type = req.body.type || task.type;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.date = req.body.date || task.date;

        const updatedTask = task.save();
        res.send("Task Info Updated");
    }
}))

Task1.delete('/delete', expressAsyncHandler(async (req, res) => {
    const task = await Task1.findById(req.body._id);
    if (task) {
        const deleteTask = await task.remove();
        res.send("task deleted");
    } else {
        res.status(401).send("task not found");
    }
}))

export default Task;