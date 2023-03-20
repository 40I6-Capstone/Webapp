import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button, Layout, Row, Col, Spin } from 'antd';
import { SendMessage } from 'react-use-websocket/dist/lib/types';
import { WebsocketContext } from '../../App';
import PathsPlot from './PathsPlot';

import './Dashboard.css'
import { selectLoading, selectState } from './dashboardSelector';
import { selectUGVs } from '../../AppSelector';
import { updateLoading, updateState } from './dashboardSlice';

export function Dashboard() {
  const dispatch = useAppDispatch();

  const ws = useContext(WebsocketContext);

  const state = useAppSelector(selectState);
  const loading = useAppSelector(selectLoading);
  const ugvs = useAppSelector(selectUGVs);

  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>();
 
  const onClick = useCallback(()=>{
    switch(state) {
      case 'idle':
        dispatch(updateLoading(true));
        console.log("update loading");
        ws?.startScout();
        break;
      case 'scouted':
        ws?.startUGVs();
    }
  },[ws]);

  useEffect(() => {
    switch(state) {
      case 'idle':
        setButtonText('Scout Spill');
        break;
      case 'scouted':
        setButtonText('Start All UGVs');
        break;
      case 'running':
        setButtonText('Pause');
        break;
      case 'paused':
        setButtonText('Continue');
        break;
    }
  },[state, setButtonText]);

  useEffect(() => {
    if(state !== 'scouted') {
      setButtonDisable(false);
    } else {
      setButtonDisable(ugvs.length === 0);
    }
  },[ugvs, state]);

  return (
    <Row className='stretch-row'>
      <Col span={24} className='fill-col'>
        <Spin spinning={loading}>
          <Layout>
            <Layout.Content>
              <Row className='stretch-row'>
                <PathsPlot />
              </Row>
            </Layout.Content>
            <Layout.Sider className='dashboard-sider'>
              <Button type="primary" onClick={onClick}>
                {buttonText}
              </Button>
            </Layout.Sider>
          </Layout>
        </Spin>
      </Col>
    </Row>
  );
}
export default(Dashboard);
