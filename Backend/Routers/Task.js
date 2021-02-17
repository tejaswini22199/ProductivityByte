import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../Schemas/TaskModel.js';
import data from '../data.js';

const  Task= express.Router();

//database seed
Task.get('/seed', expressAsyncHandler(async (req, res) => {
    await Task.remove({});
    const createdTasks = Task.insertMany(data.tasks);
    res.send({createdTasks});
}));

Task.get('/', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find({});
    res.send({tasks});
}));

Task.get('/importanceDescending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ "priority": -1 });
    res.send({ tasks });
}));

Task.get('/importanceAscending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ "priority": 1 });
    res.send({ tasks });
}));

Task.get('/dateDescending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ "date": 1 });
    res.send({ tasks });
}));

Task.get('/dateAscending', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ "date": -1 });
    res.send({ tasks });
}));

Task.get('/typeAlphabetical', expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ "type": 1 });
    res.send({ tasks });
}))

Task.get('/:id', expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send({task});
}))

Task.post('/', expressAsyncHandler(async (req, res) => {
    const task = new Task({
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

Task.put('/update', expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.body._id);
    if (task) {
        task.isComplete = req.body.isComplete;
        const updatedTask = await task.save();
        res.send("Task completed");
    } 
}))

Task.put('/edit', expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.body._id);
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

Task.delete('/delete', expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.body._id);
    if (task) {
        const deleteTask = await task.remove();
        res.send("task deleted");
    } else {
        res.status(401).send("task not found");
    }
}))

export default Task;