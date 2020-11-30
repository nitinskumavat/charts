import { useEffect, useState } from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts'
import './App.css';


function App() {
  const[error,setError]=useState(null);
  const[isLoaded,setIsLoaded]=useState(false);
  const [data,setData]=useState([]);

  const getData=()=>{
    fetch("https://qcroy2b7qg.execute-api.ap-south-1.amazonaws.com/prod/data")
      .then(res=>res.json())
      .then((result)=>{
        setIsLoaded(true)
        setData(result)
      },
      (error)=>{
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(()=>{
    getData()
    const interval=setInterval(()=>{
      getData();
    },15*1000);
    return ()=>clearInterval(interval)
  },[])
  
  if(error){
    return <div className="error">Error: {error.message}</div>
  }
  else if(!isLoaded){
    return (<div className="loading">Loading.......</div>)
  }
  else return(
    <div>
      <div className="heading"><h1>Graph</h1></div>
      <LineChart width={1300} height={500} data={data}
          margin={{top: 15, right: 20, left: 20, bottom: 5}} >
        <XAxis dataKey="month"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Line type="monotone" dataKey="cupcake" stroke="#8884d8"  activeDot={{r: 7}}/>
      </LineChart>
      <div className="info">Graph will be updated at an interval of <span>&#8773;</span>1 minute</div>
    </div>

  )
}

export default App;
