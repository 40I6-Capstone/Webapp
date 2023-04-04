import { useState, useCallback, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button, Layout, Row, Col, Spin, InputNumber, Typography } from 'antd';
import { WebsocketContext } from '../../App';
import PathsPlot from './PathsPlot';

import './Dashboard.css'
import { selectLoading, selectState } from './dashboardSelector';
import { selectUGVs } from '../../AppSelector';
import { updateLoading } from './dashboardSlice';
import UGVData from './ugvData';
import UAVData from './uavData';

export function Dashboard() {
  const dispatch = useAppDispatch();

  const ws = useContext(WebsocketContext);

  const state = useAppSelector(selectState);
  const loading = useAppSelector(selectLoading);
  const ugvs = useAppSelector(selectUGVs);

  const [isIdle, setIsIdle] = useState<boolean>();
  const [ugvDataElements, setUGVDataElements] = useState<JSX.Element[]>([]);
  const [numOfUgvs, setNumOfUgvs] = useState<number>(2);
 
  const onClick = useCallback(()=>{
    switch(state) {
      case 'idle':
        dispatch(updateLoading(true));
        ws?.startScout(numOfUgvs);
        break;
      case 'scouted':
        ws?.startUGVs();
    }
  },[ws, numOfUgvs, state, dispatch]);

  const onNumOfUgvsChange = (value: number|null)=> {
    if (!value) return;
    setNumOfUgvs(value);
  };


  useEffect(() => {
    switch(state) {
      case 'idle':
        setIsIdle(true);
        break;
      case 'scouted':
        setIsIdle(false);
        break;
    }
  },[state, setIsIdle]);

  useEffect(() => {
    const ugvElement:JSX.Element[] = [];
    ugvs.forEach((ugv) => ugvElement.push(<UGVData ugv={ugv} key={ugv.id}/>));  
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
                <Button type="primary" onClick={onClick} style={{width: '100%'}}>
                  {isIdle?'Scout Spill':'Reset setup'}
                </Button>
              <Row style={{margin: '10px 0px'}}>
                { isIdle && (
                  <>
                    <Typography.Paragraph>Number of UGVs to Deploy:</Typography.Paragraph>
                    <InputNumber min={1} defaultValue={numOfUgvs} onChange={onNumOfUgvsChange}/>
                  </>
                )}
              </Row>
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
