import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { drawChart, initChart } from './charts/BasicD3';
import BarChart from './charts/BarChart';

const dataset = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30]
]
let i = 0;

function App() {
  const [ eq_data, setEqData ] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // initChart(400, 600);
    // changeChart();
    changeData();
    const getData = async () => {
      const dataFromServer = await fetchData();
      setEqData(dataFromServer);
      console.log("DATAAA", dataFromServer);
    }
    getData();
  }, []);

  const changeData = () => {
    console.log("CHANGEDATA: ", i);
    setData(dataset[i++]);
    if(i === dataset.length) i = 0;
  }

  const changeChart = () => {
    drawChart(400, 600, dataset[i++]);
    if(i === dataset.length) i = 0;
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
        <Button variant="outlined" onClick={changeData}>Change Data</Button>
        {/* <div id="chart"></div> */}
        <BarChart width={600} height={400} data={data} />
      </div>
    </div>
  );
}

export default App;
