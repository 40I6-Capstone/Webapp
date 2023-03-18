import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Row, Space, Button, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons'
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


export function SingleUGVMenu(props:mainPageProps) {
  const { sendMessage } = props;
  const [ugvId, setUgvId] = useState<number>();
  const [options, setOptions] = useState<ugvOption[]>([{value: 0, label: "UGV 0"}, {value: 1, label: "UGV 1"}]);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);


  const onUGVGoClick = useCallback(()=>{
    sendMessage(`Start UGV ${ugvId}`);
  },[sendMessage, ugvId]);

  const onSelect = useCallback((value: number)=>{
    setUgvId(value);
  },[setUgvId]);

  const showSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <>
      <Row style={{padding: '20px'}}>
        <Space wrap>
          <Button type="primary" onClick={onUGVGoClick}>Start UGV</Button>

          <Select
            onChange={onSelect}
            options={options}
          />
          <Button>
            <SettingOutlined onClick={showSettings}/>
          </Button>
        </Space>
      </Row>
      <Outlet context={[isSettingsOpen, setIsSettingsOpen]}/>
    </>
  );
}

export default SingleUGVMenu;
