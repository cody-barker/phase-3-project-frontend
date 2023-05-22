import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import './App.css';

function App() {
   
  const [allFarms, setAllFarms] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/farms")
    .then(r => r.json())
    .then(farms => setAllFarms(farms))
  },[])

  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route 
            path="/" 
            element={<Home allFarms={allFarms} setAllFarms={setAllFarms}/>}/>
        </Routes>
    </div>
  );
}

export default App;