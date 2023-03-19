import React, {useState, useEffect, useCallback, createContext, ReactNode} from 'react';
import { useAppDispatch } from './app/hooks';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import MainPage from './features/MainPage/MainPage';
import SingleUGVMenu from './features/SingleUGV/SingleUGVMenu';
import SingleUGVPage from './features/SingleUGV/SingleUGV';
import UGVMotorVel from './features/SingleUGV/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGV/SingleUGVDiag/MotorDist';
import { handleMessage } from './AppSlice';
import './App.css';
import { ConfigProvider, Menu, theme, Layout } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';

const socketUrl = 'ws://127.0.0.1:63733';

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

interface Props {
  children: ReactNode;
}

interface ws {
  startUGV: (id: number) => void;
  startUGVs: () => void;

}
export const WebsocketContext = createContext<ws|null>(null);


function WebSocketProvider (props: Props) {
  const {children} = props;

  const dispatch = useAppDispatch();
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      dispatch(handleMessage(lastMessage.data));
    }

  }, [dispatch, lastMessage]);

  const ws = {
    startUGV: (id: number) => {
      const msg = {
        type: 'start',
        data: id
      };
      sendMessage(JSON.stringify(msg));
    },
    startUGVs: () => {
      const msg = {
        type: 'startAll',
      };
      sendMessage(JSON.stringify(msg));
    },
  };

  return(
    <WebsocketContext.Provider value={ws}>
      {children}
    </WebsocketContext.Provider>
  )

}

function App() {

  const location = useLocation();

  const dispatch = useAppDispatch();

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
            <WebSocketProvider>
              <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='ugv' element={<SingleUGVMenu />}>
                  <Route path='state' element={<SingleUGVPage/>}/>
                  <Route path='diag/vel' element={<UGVMotorVel/>}/>
                  <Route path='diag/dist' element={<UGVMotorDist/>}/>
                </Route>
              </Routes>
            </WebSocketProvider>
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
