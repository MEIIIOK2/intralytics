import React from 'react';
import './App.css';
import Navbar from './modules';
import Loaded from './modules/Loaded';
import Upload from './modules/Upload';
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
        
    </Routes>
    </Router>
);
}
  
export default App;