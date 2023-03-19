import React, { useState, useCallback, useContext } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SendMessage } from 'react-use-websocket/dist/lib/types';
import { WebsocketContext } from '../../App';

export function MainPage() {
  const dispatch = useDispatch;

  const ws = useContext(WebsocketContext);

  const onClick = useCallback(()=>{
    console.log("Send message to UGV")
    ws?.startUGVs();
  },[ws]);

  return (
    <>
      
      <Button title='Button' onClick={onClick}>
        Start UGV
      </Button>
    </>
  );
}
export default(MainPage);
