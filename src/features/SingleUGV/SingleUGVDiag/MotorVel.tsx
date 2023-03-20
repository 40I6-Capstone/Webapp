import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { Row, Col, Typography } from 'antd';
import { selectMotorAvgVel, selectMotorLVel, selectMotorRVel, selectMotorT } from '../singleUGVSelector';

export function UGVMotorVel() {
  const lineSize = useOutletContext<number>();

  const v_right = useAppSelector(selectMotorRVel);
  const v_left = useAppSelector(selectMotorLVel);
  const v_avg = useAppSelector(selectMotorAvgVel);
  const t = useAppSelector(selectMotorT);


  return (
    <>
      <Row className={"stretch-row"}>
      <Col span={24}>
          <Typography.Title style={{margin: '24px 0px 10px 24px'}} level={4}>Velocity of Motors</Typography.Title>
          <Plot
              divId="motorVel"
              data={[
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Average Velocity',
                  x: v_avg,
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
                    x: v_right,
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
                  x: v_left,
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
                yaxis: {title: 'Velocity (m/s)'},   
                margin: {
                  t: 10
                }       
              }}
              useResizeHandler={true}
          />
        </Col>
      </Row>
    </>
  );
}

export default(UGVMotorVel);