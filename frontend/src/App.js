import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'
// import HomeScreen from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
import Home from './Components/Home'
import { useState } from 'react';
import Navbar from './Components/Navbar';
import './CSS/nav.css'
import CreateTask from './Components/CreateTask'
import EditTask from './Components/EditTask'
// import TaskCalendarScreen from './screens/TaskCalendarScreen';
// import EditTaskScreen from './screens/EditTaskScreen';
import menu from './Assets/menu.png'
import { Menu } from '@material-ui/core';

function App() {
  const [showNavbar, setshowNavbar] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div className={showNavbar ? "viewport-icon" : "viewport-180deg"} >
            <img src={menu} alt="menu" onClick={(e) => setshowNavbar(!showNavbar)}></img>
          </div>
          <div className="container">
            <Navbar showNavbar={showNavbar} setshowNavbar={setshowNavbar} onClick={(e) => setshowNavbar(!showNavbar)}></Navbar>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} /> */}
          <Route path="/create" component={CreateTask} />
          {/* <Route path="/tasks/monthly" component={TaskCalendarScreen} /> */}
          <Route path='/tasks/:id/edit' component={EditTask} />
          <Navbar/>
        </main>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
// © 2021 GitHub, Inc.