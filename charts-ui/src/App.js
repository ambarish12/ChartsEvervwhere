import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function App() {
  const [ eq_data, setEqData ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setEqData(dataFromServer);
      console.log("DATAAA", dataFromServer);
    }
    getData();
  }, [])

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
    </div>
  );
}

export default App;
