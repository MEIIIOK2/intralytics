import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ProgressBar from 'react-bootstrap/ProgressBar'
function Loaded(){
    const [loadedfiles,setloadedfiles] = useState([]);
    const [downloaded,setDownloaded] = useState(0);
    const [prewsize,setprewsize] = useState(10);
    const [rows,setrows] = useState([]);
    const [columns,setcolumns]= useState([]);
    const [status,setStatus] = useState('Idle');


    
    useEffect(()=>{
        getloadedFiles()
    },[])
    function getloadedFiles(){
        axios.get("https://cardanoyield.info/").then((resp)=>{setloadedfiles(resp.data);console.log(resp)})
    }
    function onDownloadProgress(e){
        setDownloaded(Math.round((100 * e.loaded) / e.total))
        if(e.loaded >0){
            setStatus('Retrieving data')
        }
        if(e.loaded == e.total){
            setStatus('Done')
        }
      }
    function getFileinfo(fname){
        setStatus('Processing by server')
        axios.post("https://cardanoyield.info/file",{filename:fname,nrows:prewsize},{onDownloadProgress}).then(
            res => {setrows(res.data.rowdata);
            setcolumns(res.data.columns);console.log(res.data)}
        )
    }
    return(
        <div >
             <Button variant="contained" className='loadbutton' onClick={getloadedFiles}>Update</Button>
             <br></br>
                <Select id='setsize' name='sizeselector' value={prewsize} onChange={(e)=>{setprewsize(e.target.value);console.log(e.target.value)}}>
                    <MenuItem  value={10}>10</MenuItem>
                    <MenuItem  value={50}>50</MenuItem>
                    <MenuItem  value={100}>100</MenuItem>
                    <MenuItem  value={1000000}>1000000</MenuItem>
                </Select>
             {loadedfiles.map(name=>(
                 <Button variant="contained" key={name} value={name} onClick={(e)=>{getFileinfo(e.target.value)}} >{name}</Button>
             ))}
             <br></br>
             <h1>Status:{status}</h1>
             <div style={{ width: 500}}>
                <ProgressBar  variant='success' now={downloaded}/>
             </div>
             <br></br>
             <div style={{ height: 800, width: '100%' }}>
                <DataGrid  rows={rows} columns={columns} rowsPerPageOptions={[5,10,100,10000000]}/>
            </div>
            
        </div>
    )
     
}
export default Loaded;
