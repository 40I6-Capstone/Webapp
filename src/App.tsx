import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { SingleUGVPage } from './features/SingleUGV/SingleUGV';
import UGVMotorVel from './features/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGVDiag/MotorDist';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route path='ugv' element={<SingleUGVPage/>} />
          <Route path='ugv/diag/vel' element={<UGVMotorVel/>}/>
          <Route path='ugv/diag/dist' element={<UGVMotorDist/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
