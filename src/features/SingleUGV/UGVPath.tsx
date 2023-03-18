import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Props {
  lineSize: number;
  markerOutline: boolean;
}

function getExpMarkerColours(numOfPoints: number):string[] {
  const colours: string[] = [];
  const dx = 255/(numOfPoints-2);

  for(let i = 0; i<numOfPoints-1; i++){
      const g = Math.round(dx*i);
      colours.push(`rgb(255,${g},0)`);
  }
  colours.push(`rgb(255,255,255)`);
  return colours;
}

function getActMarkerColours(numOfPoints: number):string[] {
  const colours: string[] = [];
  const dx = 255/(numOfPoints-2);

  for(let i = 0; i<numOfPoints-1; i++){
      const g = Math.round(255 - dx*i);
      const r = Math.round(dx*i);

      colours.push(`rgb(${r},${g},255)`);
  }
  colours.push(`rgb(255,255,255)`);
  return colours;
}

export function SingleUGVPath(props: Props) {
  const { lineSize, markerOutline } = props;

  return (
    <>
      <Typography.Title style={{margin: '24px 0px 0px 24px'}} level={4}>Path of UGV</Typography.Title>
      <Plot
          divId="singlePos"
          data={[
              {
                  type: 'scatter',
                  mode: 'lines+markers',
                  name:'Expected',
                  x: [1, 2, 3 , 4],
                  y: [2, 6, 3, 4],
                  line: {
                    color: 'rgb(100, 0, 0)',
                    width: lineSize
                  },
                  marker: {
                    color: getExpMarkerColours(4),
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
                mode: 'lines+markers',
                name: 'Actual',
                x: [1.1, 2.3, 2.9, 6],
                y: [2.01, 5.8, 3.1, 5],
                line: {
                  color: 'rgb(0, 0, 255)',
                  width: lineSize
                },
                marker: {
                  color: getActMarkerColours(4),
                  size: lineSize+10,
                  symbol: 'cross',
                  line:{
                    color: 'white',
                    width: markerOutline?lineSize/2:0,
                  }
                }
            },
          ]}
          layout={{
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: {color:'white'},
            xaxis: {title: 'X Position'},
            yaxis: {title: 'Y Position'},
            margin: {
              t: 10,
              r: 20
            }
          }}
          useResizeHandler={true}
      />
    </>
  );
}
export default(SingleUGVPath);
