import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Props {
  lineSize: number;
}
export function UGVHead(props: Props) {
  const { lineSize } = props;
  return (
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
          yaxis: {title: 'Velocity (m/s)'},   
          margin:{
            t: 30,
            b:30
          }         
        }}
        useResizeHandler={true}
    />
  );
}

export default(UGVHead);

