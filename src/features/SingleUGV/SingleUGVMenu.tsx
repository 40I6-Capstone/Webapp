import React, { useState, useCallback } from 'react';
import { Outlet, Link, useLocation} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Layout, Menu, Row, Space, Button, Select, MenuProps } from 'antd';
import { SettingOutlined, AimOutlined, HeartOutlined, DashboardOutlined, LineChartOutlined } from '@ant-design/icons'
import { SendMessage } from 'react-use-websocket/dist/lib/types';

import SingleUGVPath from './UGVPath';
import UGVVel from './UGVV';
import './SingleUGV.css';

interface mainPageProps {
  sendMessage: SendMessage
}

interface ugvOption {
  value: number,
  label: string,
}

const items: MenuProps['items'] = [
  {
    key: "state",
    label: (<Link to='/UGV/state'>UGV State</Link>),
    icon: (<AimOutlined />),
  },
  {
    key: "diag",
    label: "Motor Diagnostics",
    // icon: (<HeartOutlined />),
    children: [
      {
        key: "vel",
        label: (<Link to="/ugv/diag/vel">Velocity</Link>),
        icon: (<DashboardOutlined />)
      },
      {
        key: "dist",
        label: (<Link to="/ugv/diag/dist">Distance</Link>),
        icon: (<LineChartOutlined/>)
      },
    ],
    type: 'group'
  }
];

function getLocationKey(path: string){
  const pathArr = path.split('/');
  return [pathArr[pathArr.length -1]];
}

export function SingleUGVMenu(props:mainPageProps) {
  const { sendMessage } = props;

  const location = useLocation();

  const [ugvId, setUgvId] = useState<number>();
  const [options, setOptions] = useState<ugvOption[]>([{value: 0, label: "UGV 0"}, {value: 1, label: "UGV 1"}]);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);


  const onUGVGoClick = useCallback(()=>{
    sendMessage(`Start UGV ${ugvId}`);
  },[sendMessage, ugvId]);

  const onSelect = useCallback((value: number)=>{
    setUgvId(value);
  },[setUgvId]);



  return (
    <Layout>
      <Layout.Sider collapsible defaultCollapsed={true}>
        <Menu mode='inline' items={items} defaultSelectedKeys={getLocationKey(location.pathname)}/>
      </Layout.Sider>
      <Layout.Content>
        <Row style={{padding: '20px'}}>
          <Space wrap>
            <Select
              onChange={onSelect}
              options={options}
            />
            <Button type="primary" onClick={onUGVGoClick}>Start UGV</Button>
          </Space>
        </Row>
        <Outlet context={[isSettingsOpen, setIsSettingsOpen]}/>
      </Layout.Content>
    </Layout>
  );
}

export default SingleUGVMenu;
