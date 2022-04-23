import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import React, {useState,useEffect} from 'react';

function ReadData(e){
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const reader = new FileReader();
    const file = e;
    reader.onload = (evt) =>{
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        // const data = XLSX.write(wb,{bookType:'csv',type:'binary'})
        
        const dataStringLines = data.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const list = [];
        for (let i = 1; i < 10; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
                if (d[0] == '"')
                d = d.substring(1, d.length - 1);
                if (d[d.length - 1] == '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
                obj[headers[j]] = d;
            }
            }
            if (Object.values(obj).filter(x => x).length > 0) {
                list.push(obj);
            }
            }
        }
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));
        
        setData(list);
        setColumns(columns);
       
    }
    if(e){
        reader.readAsBinaryString(file);
    }
    return (
        <div>
          <h1>Preview</h1>
          
          <DataTable
            pagination
            highlightOnHover
            columns={columns}
            data={data}
          />
        </div>
      );
    
};

export default ReadData;