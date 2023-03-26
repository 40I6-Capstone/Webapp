import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { UGVInfo, ugvState } from "../../AppSlice";
import { Button, Divider } from "antd";

interface Props {
  ugv: UGVInfo;
}

export function UGVData(props:Props) {
  const { ugv } = props;

  const [showLoad, setShowLoad] = useState<boolean>(false);

  useEffect(() => {
    setShowLoad(ugv.state == ugvState.idle);
  }, [ugv, showLoad]);

  const onUGVReady = useCallback(() => {

  },[]);
  return (
    <>
      <Divider> {ugv.name} </Divider>
      <h4>State: {ugv.state}</h4>
      {showLoad &&(
        <Button onClick={onUGVReady}>
          UGV Ready To Go
        </Button>
      )}
    </>
  );
}

export default UGVData;