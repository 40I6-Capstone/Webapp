import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function UGVVel() {
  
  return (
    <Plot
        divId="singleUGVVelocity"
        data={[
            {
                type: 'scatter',
                mode: 'lines+markers',
                name:'Expected',
                x: [1, 2, 3],
                y: [2, 6, 3],
                line: {
                  color: 'rgb(255, 0, 0)',
                  width: 5
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
                width: 5
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
        }}
        useResizeHandler={true}
    />
  );
}

export default(UGVVel);

