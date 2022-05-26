import React from 'react';
import './App.css';
import Navbar from './modules';
import Loaded from './modules/Loaded';
import Upload from './modules/Upload';
import Charts from './modules/charts';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';



  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Loaded/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/csv' element={<Loaded/>} />
        <Route path='/blogs' element={<Charts/>} />
        
    </Routes>
    </Router>
);
}
  
export default App;