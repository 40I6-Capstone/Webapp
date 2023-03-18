import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Props {
  lineSize: number;
}
export function UGVHead(props: Props) {
  const { lineSize } = props;
  return (
    <>
      <Typography.Title style={{marginBottom: '0px'}} level={4}>Heading of UGV</Typography.Title>
      <Plot
          divId="singleUGVHeading"
          data={[
              {
                  type: 'scatter',
                  mode: 'lines+markers',
                  name:'Expected',
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
                name: 'Actual',
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
            yaxis: {title: 'Heading (deg)'},   
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

export default(UGVHead);

