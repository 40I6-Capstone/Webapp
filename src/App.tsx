import React, {useState, useEffect, useCallback} from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import MainPage from './features/MainPage/MainPage';
import SingleUGVMenu from './features/SingleUGV/SingleUGVMenu';
import SingleUGVPage from './features/SingleUGV/SingleUGV';
import UGVMotorVel from './features/SingleUGV/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGV/SingleUGVDiag/MotorDist';
import './App.css';
import { ConfigProvider, Col, Menu, theme, Layout, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';
import { SelectInfo } from 'rc-menu/lib/interface';

const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token:{
    colorPrimary: '#00875a',
    colorBgBase: '#24292e',
    borderRadius: 3
  },
  components:{
    Layout:{
      colorBgHeader: '#363D45',
      colorPrimary: '#00875a',
      colorBgTrigger: '#00875a',
    }
  }
}

const items: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: (<Link to='/'>Dashboard</Link>),
    icon: (<DashboardOutlined />), 
  },
  {
    key: 'singleUGV',
    label: (<Link to='/ugv/state'>SingleUgv</Link>),
    icon: (<SubnodeOutlined />),
  }
]

function App() {

  const location = useLocation();
    
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
        <Layout>
          <Layout.Header style={{background: '#363d45'}}>
            <Menu 
              defaultSelectedKeys={[location.pathname=='/'?'dashboard':'singleUGV']}
              mode="horizontal" 
              items={items} 
            />
          </Layout.Header>
          <Layout.Content>
            <Routes>
              <Route path='/' element={<MainPage sendMessage={sendMessage}/>}/>
              <Route path='ugv' element={<SingleUGVMenu sendMessage={sendMessage}/>}>
                <Route path='state' element={<SingleUGVPage/>}/>
                <Route path='diag/vel' element={<UGVMotorVel/>}/>
                <Route path='diag/dist' element={<UGVMotorDist/>}/>
              </Route>
            </Routes>
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
