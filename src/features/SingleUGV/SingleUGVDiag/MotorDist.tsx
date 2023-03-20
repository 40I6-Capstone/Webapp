import { useOutletContext } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { Row, Col, Typography } from 'antd';
import { selectMotorAvgDist, selectMotorLDist, selectMotorRDist, selectMotorT } from '../singleUGVSelector';

export function UGVMotorDist() {
  const lineSize = useOutletContext<number>();
  const d_right = useAppSelector(selectMotorRDist);
  const d_left = useAppSelector(selectMotorLDist);
  const d_avg = useAppSelector(selectMotorAvgDist);
  const t = useAppSelector(selectMotorT);

  return (
    <>
      <Row className="stretch-row">
        <Col span={24}>
          <Typography.Title style={{margin: '24px 0px 10px 24px'}} level={4}>Distance Motors Traveled</Typography.Title>
          <Plot
              divId="motorVel"
              data={[
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Average',
                  x: d_avg,
                  y: t,
                  line: {
                    color: 'rgb(255, 255, 255)',
                    width: lineSize
                  },
                },
                {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name:'Right Motor',
                    x: d_right,
                    y: t,
                    line: {
                      color: 'rgb(255, 0, 0)',
                      width: lineSize
                    },
                },
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Left Motor',
                  x: d_left,
                  y: t,
                  line: {
                    color: 'rgb(0, 255, 255)',
                    width: lineSize
                  },
                },
              ]}
              layout={{
                autosize: true,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: {color:'white'},
                xaxis: {title: 'Time (s)'},
                yaxis: {title: 'Distance (m)'},   
                margin: {
                  t:10
                }     
              }}
              useResizeHandler={true}
          />
        </Col>
      </Row>
    </>
  );
}

export default(UGVMotorDist);