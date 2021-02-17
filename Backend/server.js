import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import User from './Routers/User.js';
import Task from './Routers/Task.js';

const app = express();

app.use(express.static(path.join(path.resolve(), '/frontend/build')));

app.use(express.json()); // parse http requests
app.use(express.urlencoded({ extended: true }));

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', User);
app.use('/api/tasks', Task);

app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), '/frontend/build/index.html'));
})

app.use((err, req, res, next) => {
    res.status(500).send("Server error" + err);
})

const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log(`server started on https://localhost:${port}`);
})