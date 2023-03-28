import React, { useEffect, useState } from 'react';
import { Data } from 'plotly.js';
import Plot from 'react-plotly.js';
import { lime, green, cyan, blue, purple, magenta } from '@ant-design/colors'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { forEach, map } from 'lodash';
import { 
  selectShapeMidX, 
  selectShapeMidY, 
  selectShapeVertX, 
  selectShapeVertY, 
  selectContourX, 
  selectContourY, 
  selectPaths,
  selectUgvPaths,
  selectImg,
  selectUgvPlacedBooms
} from './dashboardSelector';


export const colourIndex = [lime, cyan, magenta, green, blue, purple];

export function PathsPlot() {
  
  const shapeVertX = useAppSelector(selectShapeVertX);
  const shapeVertY = useAppSelector(selectShapeVertY);
  const shapeMidX = useAppSelector(selectShapeMidX);
  const shapeMidY = useAppSelector(selectShapeMidY);
  const contourX = useAppSelector(selectContourX);
  const contourY = useAppSelector(selectContourY);
  const paths = useAppSelector(selectPaths);
  const ugvPaths = useAppSelector(selectUgvPaths);
  const ugvPlacedBooms = useAppSelector(selectUgvPlacedBooms);

  const img = useAppSelector(selectImg);

  const [pathData, setPathData] = useState<Data[]>([]);
  const [ugvPathData, setUgvPathData] = useState<Data[]>([]);
  const [ugvPlacedBoomsData, setUgvPlacedBoomsData] = useState<Data[]>([]);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const pathData: Data[] = [];
    paths.forEach((path) => {
      pathData.push({
        type: 'scatter',
        mode: 'lines',
        name:'shape',
        x: map(path,(a: number[])=>a[0]),
        y: map(path,(a: number[])=>a[1]),
        line: {
          color: 'rgb(255, 0, 0)',
          width: 2
        },
        hoverinfo: 'none',
      })
    });
    setPathData(pathData)

  },[paths, setPathData]);

  useEffect(() => {
    const pathData: Data[] = [];
    forEach(ugvPaths,((path, i) => {
      if(path.length ==0) return;
      pathData.push({
        type: 'scatter',
        mode: 'lines',
        name:'shape',
        x: map(path,(a: number[])=>a[0]),
        y: map(path,(a: number[])=>a[1]),
        line: {
          color: colourIndex[Number(i)][6],
          width: 2
        },
        hoverinfo: 'none',
      });
      pathData.push({
        type: 'scatter',
        mode: 'text+markers',
        name:'shape',
        x: [path[path.length - 1][0]],
        y: [path[path.length - 1][1]],
        text: `UGV ${i}`,
        textposition:'top center',
        marker: {
          color: colourIndex[Number(i)].primary,
          size: 10,
        },
        hoverinfo: 'x+y+text',
      });
    }));
    setUgvPathData(pathData)

  },[ugvPaths, setUgvPathData]);

  useEffect(() => {
    const placedBooms: Data[] = [];
    forEach(ugvPlacedBooms,((ugvBooms, i) => {
      if(ugvBooms.length ==0) return;
      pathData.push({
        type: 'scatter',
        mode: 'markers',
        name:'boom',
        x: map(ugvBooms,(a: number[])=>a[0]),
        y: map(ugvBooms,(a: number[])=>a[1]),
        marker: {
          color: colourIndex[Number(i)][6],
          size: 15,
          symbol: 'asterisk',
          line: {
            color: colourIndex[Number(i)][6],
            width: 3,
          }
        },
      });
    }));
    setUgvPlacedBoomsData(placedBooms)

  },[ugvPlacedBooms, setUgvPlacedBoomsData]);

  useEffect(()=> {
    if(img.src === '') return;
    setImages([{
      x: img.off[0],
      y: img.off[1] + img.dim[1],
      sizex: img.dim[0],
      sizey: img.dim[1],
      source: img.src,
      xref: 'x',
      yref: 'y',
      layer: 'below',
      sizing: 'stretch',
      opacity: 0.5

    }]);
  },[img, setImages])

  return (
    <Plot
        divId="fullPathsPlot"
        data={[
          {
            type: 'scatter',
            mode: 'markers',
            name:'Origin',
            x: [0],
            y: [0],
            marker: {
              color: 'rgb(255, 0, 0)',
              width: 5,
              symbol: 'cross',

            },
            hoverinfo: 'none',
          },
          {
            type: 'scatter',
            mode: 'lines',
            name:'shape',
            x: shapeVertX,
            y: shapeVertY,
            line: {
              color: 'rgb(255, 255, 0)',
              width: 2
            },
          },
          {
            type: 'scatter',
            mode: 'markers',
            name:'shape',
            x: shapeMidX,
            y: shapeMidY,
            marker: {
              color: 'rgb(255, 255, 0)',
              width: 2
            },
            hoverinfo: 'none',
          },
          {
            type: 'scatter',
            mode: 'lines',
            name:'contour',
            x: contourX,
            y: contourY,
            marker: {
              color: 'rgb(100, 100, 0)',
              width: 10
            },
            hoverinfo: 'none',
          },
          ...pathData,
          ...ugvPathData,
          ...ugvPlacedBoomsData
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: {color:'white'},
          xaxis: {title: 'X Position'},
          yaxis: {title: 'Y Position', scaleanchor: 'x', scaleratio: 1},
          showlegend: false, 
          images,    
        }}
        config={{
          scrollZoom: true
        }}
        useResizeHandler={true}
    />
  );
}
export default(PathsPlot);
