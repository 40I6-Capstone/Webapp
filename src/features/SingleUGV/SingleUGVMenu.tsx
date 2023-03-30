import React, { useState, useCallback, useContext } from 'react';
import { Outlet, Link, useLocation} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Layout, Menu, Row, Space, Button, Select, MenuProps, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { AimOutlined, DashboardOutlined, LineChartOutlined, UploadOutlined } from '@ant-design/icons'
import { selectUGVId } from './singleUGVSelector';
import { selectUGVsAsDrop } from '../../AppSelector';
import './SingleUGV.css';
import { selectPath } from './singleUGVSelector';
import { switchUGV, updatePath } from './singleUGVSlice';
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

  const ugvs = useAppSelector(selectUGVsAsDrop);
  const ugvId = useAppSelector(selectUGVId);
  const path = useAppSelector(selectPath);

  const onUGVGoClick = useCallback(()=>{
    if(ugvId == null) return;
    ws?.startUGV(ugvId, path)

  },[ws, ugvId]);

  const props: UploadProps = {
    beforeUpload: async (file) => {
      console.log(file.type);
      const isCSV = ['text/csv', 'text/x-csv', 'application/vnd.ms-excel', 'application/csv', 'application/x-csv'].includes(file.type);
      if (!isCSV) {
        message.error(`${file.name} is not a csv file`);
        return Upload.LIST_IGNORE;
      }
      const str = await file.text();
      const path = str.split("\r\n").filter((line) => line.match(/^(\d|\.)*,(\d|\.)*$/)).map(function (line) {
          const strVals = line.split(",");
          return [Number(strVals[0]), Number(strVals[1])];
      });
      console.log(path);
      dispatch(updatePath(path))
      return Upload.LIST_IGNORE; 
    },
  };

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
              defaultValue={ugvId}
            />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload Paths</Button>
            </Upload>
            <Button type="primary" onClick={onUGVGoClick} disabled={ugvId == null}>Start UGV</Button>
          </Space>
        </Row>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default SingleUGVMenu;
