
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Charts(props) {
    console.log(props.data[0])
  return (
    <ResponsiveContainer width="50%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="close" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
  )
}
