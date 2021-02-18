import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import cors from 'cors'
import bodparser from 'body-parser'
import axios from 'axios'
// const bodyParser = require('body-parser');
// const cors = require('cors');
import User from './Routers/User.js';
import Task from './Routers/Task.js';

const app = express();
// const service = axios.create({
//     baseURL: 'https://api.typingdna.com',
//     headers: {
//       'Content-Type': 'application/json',
//       'Cache-Control': 'no-cache',
//       Authorization:
//         'Basic MDUxYjNmYjRlZDYyOWYxNGQ5ZjY2ZmViOWEwZDU5NjA6YzZmNDc3MmExMTg2NzU3NmQyYzQ0ZWZjZmMxMmU3NmE',
//     },
//   });
// app.use(express.static(path.join(path.resolve(), '../frontend/build')));

app.use(express.json()); // parse http requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT=5000; 
app.use('/api/users', User);
app.use('/api/tasks', Task);

mongoose.connect('mongodb+srv://Tejaswini:teja123@cluster0.r9iwk.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(()=>app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
}))
.catch((error)=>{
    console.log("error occured");
})


// app.get("*", (req, res) => {
//     res.sendFile(path.join(path.resolve(), '/frontend/build/index.html'));
// })

// app.use((err, req, res, next) => {
//     res.status(500).send("Server error" + err);
// })

// const port = 5000;
// app.listen(port, () => {
//     console.log(`server started on https://localhost:${port}`);
// })
mongoose.set('useFindAndModify',false);