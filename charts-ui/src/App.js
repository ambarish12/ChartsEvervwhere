import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BarChart from './charts/BarChart';

function App() {
  const [eq_data, setEqData] = useState([]);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [yAxisLabel, setYLabel] = useState("");
  const flds = ["eqMagnitude", "deaths", "eqDepth"];
  const [fieldToMap, setField] = useState(flds[0]);
  const labelDict = {
    'eqMagnitude': 'Magnitude','eqDepth': 'Depth in km', 'deaths': 'Deaths in thousands'
  }
  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setEqData(dataFromServer);
      console.log("DATAAA", dataFromServer);
    }
    getData();
  }, []);

  useEffect(() => {
    changeData();
  }, [eq_data, fieldToMap]);

  const changeData = () => {
    const data = eq_data.filter(d => d[fieldToMap]).sort((a, b) => {
      return b[fieldToMap] - a[fieldToMap];
    }).filter((d, index) => index < 10);
    setData(data.map(d => {
      return {
        x: d.year,
        y: d[fieldToMap]
      }
    }));
    setTitle(`Top 10 earthquakes by ${fieldToMap}`);
    setYLabel(labelDict[fieldToMap]);
  }

  const handleChange = (event) => {
    setField(event.target.value);
  };

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/eq');
    console.log("RES", res);
    const data = await res.json();
    return data;
  }

  return (
    <div className="App">
      {eq_data.map((d, index) => <div key={index}>{d.location_name}</div>)}

      <div className="charts-div">
        <h2>Charts</h2>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Field</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fieldToMap}
            label="Field"
            onChange={handleChange}
          >
            {flds.map((d, index) => <MenuItem key={index} value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
        {data.length > 0 && <BarChart width1={600} height1={400} data={data} title={title} yAxisLabel={yAxisLabel} />}
      </div>
    </div>
  );
}

export default App;
