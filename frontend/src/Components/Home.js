import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem';
import '../CSS/card.css'
import Axios from 'axios';
import {Toolbar, AppBar,Button, Typography,Container } from '@material-ui/core';
import {Animated} from 'react-animated-css'
import '../App.css'
import Homestyle from './Homestyle'
export default function HomeScreen() {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState(0);
    const classes=Homestyle();
    useEffect(() => {
        switch (query) {
            case 0:
                    Axios.get('/api/tasks/importanceDescending')
                    .then(res => {
                        setTasks(res.data.tasks)
                    })
                break;
            case 1:
                    Axios.get('/api/tasks/importanceAscending')
                    .then(res => {
                        setTasks(res.data.tasks)
                    })
                break;
            case 2:
                Axios.get('/api/tasks/typeAlphabetical')
                .then(res => {
                    setTasks(res.data.tasks)
                })
            break;
            case 3:
                    Axios.get('/api/tasks/dateDescending')
                    .then(res => {
                        setTasks(res.data.tasks)
                    })
                break;
            default:
                    Axios.get('/api/tasks/dateAscending')
                    .then(res => {
                        setTasks(res.data.tasks)
                    })
                break;
        }
        setLoading(false);
    }, [loading])

    function setQueryState(q) {
        setLoading(true);
        setQuery(q);
    }

    return (
        <div>
            
           
            <AppBar className={classes.heading} position="static">
            <Toolbar>
            <Typography className={classes.headingcontent} variant="h4" align="center">
            Hello! Welcome to Productivity Byte
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
            </AppBar>

                <Container>
                    Sort by:
                    <div className="buttons-container">
                        <Button variant="contained" color="secondary" onClick={() => setQueryState(0)}>Most Important</Button>
                        <Button variant="contained" color="secondary" onClick={() => setQueryState(3)}>Upcoming</Button>
                        <Button variant="contained" color="secondary" onClick={() => setQueryState(1)}>Least Important</Button>
                        <Button variant="contained" color="secondary" onClick={() => setQueryState(2)}>Type</Button> 
                    </div>
                </Container>
               
            <Animated animationIn="fadeInUp">
                <div className="card-container">
                    {!loading &&
                    tasks.map((task) => (
                        <div style={{padding:'0px 10px'}}>
                                <TodoItem key={task._id} task={task} />
                        </div>
                        ))
                    }
                    {loading &&
                        <h1>Page loading</h1>
                    }
                </div>
            </Animated>
        </div>
    )
}