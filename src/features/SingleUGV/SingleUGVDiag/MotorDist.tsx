import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';


import { Row, Col, Typography } from 'antd';

export function UGVMotorDist() {
  const lineSize = useOutletContext<number>();

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
                  x: [1.1, 2.3, 2.9],
                  y: [2.01, 5.8, 3.1],
                  line: {
                    color: 'rgb(255, 255, 255)',
                    width: lineSize
                  },
                },
                {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name:'Right Motor',
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    line: {
                      color: 'rgb(255, 0, 0)',
                      width: lineSize
                    },
                },
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Left Motor',
                  x: [1.1, 2.3, 2.9],
                  y: [2.01, 5.8, 3.1],
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