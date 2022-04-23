import axios from 'axios';
 
import React,{Component} from 'react';
 
class App extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null,
      loadedpercent: 0,
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
   
    // On file upload (click the upload button)
    onFileUpload = () => {
      const config = {
        onUploadProgress: progressEvent => this.setState( {loadedpercent: Math.round( (progressEvent.loaded * 100) / progressEvent.total )}, () => console.log(this.state.loadedpercent))
    }
      // Create an object of formData
      const formData = new FormData();
      
      // Update the formData object
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("http://127.0.0.1:5000/upload", formData,config);
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h1>
              GeeksforGeeks
            </h1>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default App;