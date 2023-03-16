import React, { useState, useCallback } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SendMessage } from 'react-use-websocket/dist/lib/types';

interface mainPageProps {
  sendMessage: SendMessage
}
export function MainPage(props:mainPageProps) {
  const dispatch = useDispatch;
  const { sendMessage } = props;

  const onClick = useCallback(()=>{
    console.log("Send message to UGV");
    sendMessage("Start UGV's");
  },[sendMessage]);

  return (
    <>
      
      <Button title='Button' onClick={onClick}>
        Start UGV
      </Button>
    </>
  );
}
export default(MainPage);
