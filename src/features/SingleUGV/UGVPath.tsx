import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography, Row, Col } from 'antd';
import { selectUGVX, selectUGVXExp, selectUGVY, selectUGVyExp } from './singleUGVSelector';
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

  const x = useAppSelector(selectUGVX);
  const y = useAppSelector(selectUGVY);
  const x_exp = useAppSelector(selectUGVXExp);
  const y_exp = useAppSelector(selectUGVyExp);

  return (
    <Col span={24} className='fill-col'>
      <Typography.Title style={{margin: '24px 0px 0px 24px', flexGrow: 0}} level={4}>Path of UGV</Typography.Title>
      <Row className='stretch-row'>
        <Plot
            className='plot-full-height'
            divId="singlePos"
            data={[
                {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name:'Expected',
                    x: x_exp,
                    y: y_exp,
                    line: {
                      color: 'rgb(100, 0, 0)',
                      width: lineSize
                    },
                    marker: {
                      color: getExpMarkerColours(x_exp.length),
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
                  x,
                  y,
                  line: {
                    color: 'rgb(0, 0, 255)',
                    width: lineSize
                  },
                  marker: {
                    color: getActMarkerColours(x.length),
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
      </Row>
    </Col>
  );
}
export default(SingleUGVPath);
