import axios from 'axios';
import React, {useState,useEffect} from 'react';
function Loaded(){
    const [loadedfiles,setloadedfiles] = useState([]);
    function getloadedFiles(){
        axios.get("http://127.0.0.1:5000/").then((resp)=>{setloadedfiles(resp.data);console.log(resp)})
    }
    return(
        <div >
             <button className='loadbutton' onClick={getloadedFiles}>Update</button>
             <br></br>
             {loadedfiles}
        </div>
    )

}
export default Loaded;
