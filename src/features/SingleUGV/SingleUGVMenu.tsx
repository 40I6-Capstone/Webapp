import React, { useState, useCallback, useContext } from 'react';
import { Outlet, Link, useLocation} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Layout, Menu, Row, Space, Button, Select, MenuProps } from 'antd';
import { AimOutlined, DashboardOutlined, LineChartOutlined } from '@ant-design/icons'
import { selectUGVId } from './singleUGVSelector';
import { selectUGVsAsDrop } from '../../AppSelector';
import './SingleUGV.css';
import { switchUGV } from './singleUGVSlice';
import { WebsocketContext } from '../../App';


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

export function SingleUGVMenu() {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const ws = useContext(WebsocketContext);

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const ugvs = useAppSelector(selectUGVsAsDrop);
  const ugvId = useAppSelector(selectUGVId)

  const onUGVGoClick = useCallback(()=>{
    if(ugvId == null) return;
    ws?.startUGV(ugvId)

  },[ws, ugvId]);

  const onSelect = useCallback((value: number)=>{
    if(value != ugvId) dispatch(switchUGV(value));
  },[ugvId]);



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
              options={ugvs}
            />
            <Button type="primary" onClick={onUGVGoClick} disabled={ugvId == null}>Start UGV</Button>
          </Space>
        </Row>
        <Outlet context={[isSettingsOpen, setIsSettingsOpen]}/>
      </Layout.Content>
    </Layout>
  );
}

export default SingleUGVMenu;
