import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import tableau from "tableau-api";

function Loaded(){
    const [loadedfiles,setloadedfiles] = useState([]);
    const [downloaded,setDownloaded] = useState(0);
    const [prewsize,setprewsize] = useState(10);
    const [rows,setrows] = useState([]);
    const [columns,setcolumns]= useState([]);
    const [status,setStatus] = useState('Idle');
    const [tables,settables] = useState([]);
    const [currtable,setcurrtable] = useState('');
    const [currfile,setCurrfile] = useState('');

    
    
    useEffect(()=>{
        getloadedFiles()
        getTables()
    },[])
    function uploadTable(e,f){
        axios.get('https://cardanoyield.info/uploadtable?table='+e+'&file='+f)
    }
    function getTables(){
        axios.get('https://cardanoyield.info/tables').then((resp)=>{settables(resp.data);setcurrtable(resp.data[0].table)})
    }

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
        <div className='csv' >
            
             <Button variant="contained" className='loadbutton' onClick={getloadedFiles}>Update</Button>
             <br></br>
                <Select id='setsize' name='sizeselector' value={prewsize} onChange={(e)=>{setprewsize(e.target.value);console.log(e.target.value)}}>
                    <MenuItem  value={10}>10</MenuItem>
                    <MenuItem  value={50}>50</MenuItem>
                    <MenuItem  value={100}>100</MenuItem>
                    <MenuItem  value={1000000}>1000000</MenuItem>
                </Select>
             {loadedfiles.map(name=>(
                 <Button variant="contained" key={name} value={name} style={{left:10}} onClick={(e)=>{getFileinfo(e.target.value);setCurrfile(e.target.value)}} >{name}</Button>
             ))}
             <br></br>
             <h1>Status:{status}</h1>
             <div style={{ width: 100}}>
                <CircularProgress variant='determinate' value={downloaded} />
             </div>
             <br></br>
             
             
            <div className='workzone'>
                <div className='tablechart' style={{ height: 400, width: '30%' }}>
                <DataGrid  rows={rows} columns={columns} rowsPerPageOptions={[5,10,100,10000000]}/>
                <br></br>
                
                 </div>
                 <div className='tableselector' style={{height:50, width : "100", top:20}}>
                <Select id='choosetables' name='tableselector'  value={currtable} onChange={(e)=>{setcurrtable(e.target.value)}}>
                    {
                        tables.map(el=>( <MenuItem  value={el.table}>{el.table}</MenuItem>))
                    }
                    <MenuItem  value={"createnew"}>Create New</MenuItem>   
                </Select>
                </div>
                <Button variant="contained" style={{height:50, width : "100", left:10}} className='fuck' onClick={()=>{uploadTable(currtable,currfile)}}>Load data</Button>
            </div>
            
        </div>
    )
     
}
export default Loaded;
