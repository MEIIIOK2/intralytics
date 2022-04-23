import React from 'react';
import './App.css';
import Navbar from './modules';
import Upload from './page'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';


  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Upload />} />
        {/* <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/sign-up' element={<SignUp/>} /> */}
    </Routes>
    </Router>
);
}
  
export default App;