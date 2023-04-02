import {useEffect, createContext, ReactNode} from 'react';
import { useAppDispatch, useAppSelector, usePrevious } from './app/hooks';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import {  xorWith } from 'lodash';
import { ConfigProvider, Menu, theme, Layout, message, Row } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';
import logo from './OilLockLogo.svg'
import Dashboard from './features/Dashboard/Dashboard';
import SingleUGVMenu from './features/SingleUGV/SingleUGVMenu';
import SingleUGVPage from './features/SingleUGV/SingleUGV';
import UGVMotorDiag from './features/SingleUGV/SingleUGVDiag/MotorDiag';
import UGVMotorVel from './features/SingleUGV/SingleUGVDiag/MotorVel';
import UGVMotorDist from './features/SingleUGV/SingleUGVDiag/MotorDist';

import { handleMessage } from './AppSlice';
import { selectUGVs } from './AppSelector';
import './App.css';

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
  startUGV: (id: number, path: number[][]) => void;
  startUGVs: () => void;
  startScout: (numOfUgvs: number) => void;
  giveUgvPath: (id: number) => void;
  reconnectUav: () => void;

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
    startUGV: (id: number, path: number[][]) => {
      const msg = {
        type: 'startSingle',
        data: {
          id: id, 
          path: path,
        },

      };
      sendMessage(JSON.stringify(msg));
    },
    startScout: (numOfUgvs: number) => {
      const msg = {
        type: 'scout',
        data: numOfUgvs,
      };
      sendMessage(JSON.stringify(msg));
    },
    startUGVs: () => {
      const msg = {
        type: 'startAll',
      };
      sendMessage(JSON.stringify(msg));
    },
    giveUgvPath: (id:number) => {
      const msg = {
        type: 'giveUgvPath',
        data: id
      };
      sendMessage(JSON.stringify(msg));
    },
    reconnectUav: () => {
      const msg = {
        type: 'reconnectUav'
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

  const [messageApi, contextHolder] = message.useMessage();

  const ugvs = useAppSelector(selectUGVs);
  const prevUgs = usePrevious(ugvs);

  useEffect(() => {
    if(ugvs.length > 0 && ugvs.length > prevUgs.length) {
      const diff = xorWith(ugvs, prevUgs, (a, b)=>a.id === b.id);
      diff.forEach((ugv) => {
        messageApi.info(`${ugv.name} has been connected`);
      });
    }
    if(ugvs.length > 0 && ugvs.length < prevUgs.length) {
      const diff = xorWith(ugvs, prevUgs, (a, b)=>a.id === b.id);
      diff.forEach((ugv) => {
        messageApi.info(`${ugv.name} has been disconnected`);
      });
    }
  },[ugvs, prevUgs]);


  return (
    <div className="App">
      <ConfigProvider theme={antdTheme}>
        {contextHolder}
        <Layout>
          <Layout.Header style={{background: '#363d45', paddingInline: '0px'}}>
            <Row style={{height: '100%'}}>
              <img src={logo} style={{height: '100%', padding: '10px'}} className="App-logo" alt="logo" />
              <Menu 
                defaultSelectedKeys={[location.pathname=='/'?'dashboard':'singleUGV']}
                mode="horizontal" 
                items={items} 
              />
            </Row>
          </Layout.Header>
          <Layout.Content>
            <WebSocketProvider>
              <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='ugv' element={<SingleUGVMenu />}>
                  <Route path='state' element={<SingleUGVPage/>}/>
                  <Route path='diag' element={<UGVMotorDiag />}>
                    <Route path='vel' element={<UGVMotorVel/>}/>
                    <Route path='dist' element={<UGVMotorDist/>}/>
                  </Route>
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
