import React, {useState, useEffect, useCallback} from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import MainPage from './features/MainPage/MainPage';
import { SingleUGVPage } from './features/SingleUGV/SingleUGV';
import UGVMotorVel from './features/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGVDiag/MotorDist';
import './App.css';
import { Button } from 'antd';

function App() {
  
  // const [socket, setSocket] = useState<Socket|null>(null);
  // const WS_URL = 'ws://127.0.0.1:63733';
  
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:63733');
  const [messageHistory, setMessageHistory] = useState<any[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(lastMessage.data);
      sendMessage("Hello");
    }

  }, [lastMessage, setMessageHistory]);

  const onClick = useCallback(()=>{
    console.log("Send message to UGV1");
    sendMessage("helloooo");
  },[]);

  // useWebSocket(WS_URL, {
  //   onOpen: () => {
  //     console.log('WebSocket connection established.');
  //   },
  //   onMessage: (event)=>{
  //     console.log(event.data);
  //   }
  // });

  return (
    <div className="App">
      <Button title='Button' onClick={onClick}>
        Start UGV
      </Button>
      <Routes>
        <Route path='/' element={<MainPage sendMessage={sendMessage}/>}/>
        <Route path='/ugv' element={<SingleUGVPage/>} />
        <Route path='/ugv/diag/vel' element={<UGVMotorVel/>}/>
        <Route path='/ugv/diag/dist' element={<UGVMotorDist/>}/>
      </Routes>
    </div>
  );
}

export default App;
