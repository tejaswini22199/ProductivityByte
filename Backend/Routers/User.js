import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User  from '../Schemas/UserModel.js';
// import data from '../data.js';

const User1 = express.Router();

// router.get('/',(req,res)=>{
//     res.send("Hi");
// })
// //database seed
User1.get('/seed', expressAsyncHandler(async (req, res) => {
    await User1.remove({});
    const createdUsers = await User1.insertMany(data.users);
    res.send({ createdUsers });
}));

// gets all users
User1.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User1.find({});
    res.send(users);
}));

//for user login
User1.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await User1.findOne({ email: req.body.email });
    if (user) {
        if (req.body.password === user.password) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                tasks: user.tasks,
            })
        }
        
    }
    res.status(401).send({message: "Invalid email/password"})
}));

// saves user to database
User1.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User1({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
    })
}));

export default User1;