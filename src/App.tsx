import React, {useState, useEffect, useCallback} from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import MainPage from './features/MainPage/MainPage';
import SingleUGVMenu from './features/SingleUGV/SingleUGVMenu';
import SingleUGVPage from './features/SingleUGV/SingleUGV';
import UGVMotorVel from './features/SingleUGV/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGV/SingleUGVDiag/MotorDist';
import './App.css';
import { ConfigProvider, theme } from 'antd';

const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token:{
    colorPrimary: '#00875a',
    colorBgBase: '#24292e',
    borderRadius: 3
  }  
}

function App() {
    
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:63733');
  const [messageHistory, setMessageHistory] = useState<any[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);



  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }

  }, [lastMessage, setMessageHistory]);



  return (
    <div className="App">
      <ConfigProvider theme={antdTheme}>
        <Routes>
          <Route path='/' element={<MainPage sendMessage={sendMessage}/>}/>
          <Route path='ugv' element={<SingleUGVMenu sendMessage={sendMessage}/>}>
            <Route path='path' element={<SingleUGVPage/>}/>
            <Route path='diag/vel' element={<UGVMotorVel/>}/>
            <Route path='diag/dist' element={<UGVMotorDist/>}/>
          </Route>
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
