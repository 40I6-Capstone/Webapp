import {useEffect, createContext, ReactNode} from 'react';
import { useAppDispatch, useAppSelector, usePrevious } from './app/hooks';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { without } from 'lodash';
import { ConfigProvider, Menu, theme, Layout, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';

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
  startUGV: (id: number) => void;
  startUGVs: () => void;
  startScout: () => void;
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
    startUGV: (id: number) => {
      const msg = {
        type: 'startSingle',
        data: id
      };
      sendMessage(JSON.stringify(msg));
    },
    startScout: () => {
      const msg = {
        type: 'scout',
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
    if(ugvs.length > 0 && ugvs != prevUgs) {
      const diff = without(ugvs, ...prevUgs);
      console.log("ugvs updated", diff);
      diff.forEach((ugv) => {
        messageApi.info(`${ugv.name} has been connected`);
      });
      
    }
  },[ugvs, prevUgs]);


  return (
    <div className="App">
      <ConfigProvider theme={antdTheme}>
        {contextHolder}
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
