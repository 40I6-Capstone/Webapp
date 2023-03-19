import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUGVT, selectUGVV, selectUGVVExp } from './singleUGVSelector';

interface Props {
  lineSize: number;
}
export function UGVVel(props: Props) {
  const { lineSize } = props;

  const v = useAppSelector(selectUGVV);
  const v_exp = useAppSelector(selectUGVVExp);
  const t = useAppSelector(selectUGVT);

  return (
    <>
      <Typography.Title style={{marginBottom: '0px'}} level={4}>Velocity of UGV</Typography.Title>
      <Plot
          divId="singleUGVVelocity"
          data={[
              {
                  type: 'scatter',
                  mode: 'lines+markers',
                  name:'Expected',
                  x: t,
                  y: v_exp,
                  line: {
                    color: 'rgb(255, 0, 0)',
                    width: lineSize
                  },
              },
              {
                type: 'scatter',
                mode: 'lines',
                name: 'Actual',
                x: t,
                y: v,
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
            xaxis: {title: 'Time (ms)'},
            yaxis: {title: 'Velocity (m/s)'},   
            margin:{
              t: 0,
              b:30
            }         
          }}
          useResizeHandler={true}
      />
    </>
  );
}

export default(UGVVel);

