import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { UGVInfo } from "../../AppSlice";
import { Divider } from "antd";

interface Props {
  ugv: UGVInfo;
}

export function UGVData(props:Props) {
  const { ugv } = props;

  return (
    <>
      <Divider> {ugv.name} </Divider>
      <p>{ugv.state}</p>
    </>
  );
}

export default UGVData;