import logo from './logo.svg';
import * as XLSX from 'xlsx';
import './App.css';
import axios from 'axios';
import React, {useState,useEffect} from 'react';
import ReadData from './PocessData';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loaded from './modules/Loaded';

function App() {
  const[selectedFile,setFile] = useState(null);
  const [uploaded,setUploaded] = useState(0);
  
  
  function onUploadProgress(e){
    setUploaded (Math.round((100 * e.loaded) / e.total))
  }
  
  function uploadFile(){
    const formData = new FormData();
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    console.log(selectedFile);
    axios.post("http://127.0.0.1:5000/upload", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }, onUploadProgress});
    
  }
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
   function fileData(){
    if(selectedFile){
      
      
      return(
        <div>
          <h2>File Details:</h2>
             
             <p>File Name: {selectedFile.name}</p>
              
                          
             <p>File Type: {selectedFile.type}</p>
             <p>File Size: {bytesToSize(selectedFile.size)}</p>
             <div>
              
             <ProgressBar variant='success' now={uploaded}/>
        </div>
                          
             
        <button onClick={uploadFile}>
          Upload!
        </button>
        
        </div>
        )
    }
    
  };
    
    return(
      <div className="App">
       <h1>File uploader</h1>
       <div className='App-header'>
          <input type="file" accept='.csv' onChange={(ev)=>{setFile(ev.target.files[0]);setUploaded(0)}} />
          {fileData()}
          <h1>Files Loaded:</h1>
        <Loaded/>
        </div>
        
        
        
      </div>
    )
    
}

export default App;
