import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Props {
  lineSize: number;
  markerOutline: boolean;
}
export function SingleUGVPath(props: Props) {
  const { lineSize, markerOutline } = props;
  console.log(markerOutline);
  return (
    <Plot
        divId="singlePos"
        data={[
            {
                type: 'scatter',
                mode: 'lines+markers',
                name:'Expected',
                x: [1, 2, 3],
                y: [2, 6, 3],
                line: {
                  color: 'rgb(100, 0, 0)',
                  width: lineSize
                },
                marker: {
                  color: ['blue', 'red', 'green'],
                  size: lineSize+10,
                  symbol: 'cross',
                  line:{
                    color: 'white',
                    width: markerOutline?lineSize/2:0,
                  }
                }
            },
            {
              type: 'scatter',
              mode: 'lines',
              name: 'Actual',
              x: [1.1, 2.3, 2.9],
              y: [2.01, 5.8, 3.1],
              line: {
                color: 'rgb(0, 0, 255)',
                width: lineSize
              },
          },
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: {color:'white'},
          xaxis: {title: 'X Position'},
          yaxis: {title: 'Y Position'},
          title: "Path of UGV",           
        }}
        useResizeHandler={true}
    />
  );
}
export default(SingleUGVPath);
