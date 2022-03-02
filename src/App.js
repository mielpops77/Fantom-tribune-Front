import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LaunchDate from './pages/LaunchDate';
import Submit from './pages/Submit';
import Login from './pages/Login';
import Register from './pages/Register';
import Administration from './pages/Administration';




const App = () => {
  return (
    <div> 
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/launchDate" element={<LaunchDate />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/admin" element={<Administration/>} />

        <Route path="*" element={<Submit />} />
      </Routes>
    </Router>
    </div >
  );
};

export default App;