import { useState, useCallback, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button, Layout, Row, Col, Spin } from 'antd';
import { WebsocketContext } from '../../App';
import PathsPlot from './PathsPlot';

import './Dashboard.css'
import { selectLoading, selectState } from './dashboardSelector';
import { selectUGVs } from '../../AppSelector';
import { updateLoading, updateState } from './dashboardSlice';
import { JsxElement } from 'typescript';
import UGVData from './ugvData';
import UAVData from './uavData';

export function Dashboard() {
  const dispatch = useAppDispatch();

  const ws = useContext(WebsocketContext);

  const state = useAppSelector(selectState);
  const loading = useAppSelector(selectLoading);
  const ugvs = useAppSelector(selectUGVs);

  const [buttonText, setButtonText] = useState<string>();
  const [ugvDataElements, setUGVDataElements] = useState<JSX.Element[]>([]);
 
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
        setButtonText('Reset setup');
        break;
    }
  },[state, setButtonText]);

  useEffect(() => {
    const ugvElement:JSX.Element[] = [];
    ugvs.forEach((ugv) => ugvElement.push(<UGVData ugv={ugv}/>));  
    setUGVDataElements(ugvElement);
  }, [ugvs, setUGVDataElements]);

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
              <UAVData />
              {ugvDataElements}
            </Layout.Sider>
          </Layout>
        </Spin>
      </Col>
    </Row>
  );
}
export default(Dashboard);
