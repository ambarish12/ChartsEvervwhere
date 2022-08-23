import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { drawChart, initChart } from './charts/BasicD3';
import BarChart from './charts/BarChart';

function App() {
  const [ eq_data, setEqData ] = useState([]);
  const [data, setData] = useState([]);
  let fieldToMap = "eqMagnitude";

  useEffect(() => {
    // initChart(400, 600);
    const getData = async () => {
      const dataFromServer = await fetchData();
      setEqData(dataFromServer);
      console.log("DATAAA", dataFromServer);
    }
    getData();
  }, []);

  useEffect(()=> {
    changeData();
  }, [eq_data]);
  
  const changeData = () => {
    // console.log("CHANGEDATA: ", i);
    setData(eq_data.map(d => d[fieldToMap] || 0));
    // if(i === dataset.length) i = 0;
  }

  const changeField = (e) => {
    fieldToMap = e.target.value;
    console.log('field', fieldToMap)
  }

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/eq');
    console.log("RES", res);
    const data = await res.json();
    return data;
  }

  return (
    <div className="App">
      {eq_data.map((d, index) => <div key={index}>{d.location_name}</div>)}
      <Button variant="contained">Sample button</Button>

      <div className="charts-div">
        <h2>Charts</h2>
        <input onChange={changeField}/>
        <Button variant="outlined" onClick={changeData}>Change Data</Button>
        {/* <div id="chart"></div> */}
        <BarChart width={600} height={400} data={data} />
      </div>
    </div>
  );
}

export default App;
