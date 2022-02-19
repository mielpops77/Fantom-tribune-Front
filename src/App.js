import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Submit from './pages/Submit';


const App = () => {
  return (
    <div> 
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Submit />} />
      </Routes>
    </Router>
    </div >
  );
};

export default App;