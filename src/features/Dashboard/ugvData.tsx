import { useEffect, useState, useContext, useCallback } from "react";
import { useAppDispatch } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { UGVInfo, ugvState } from "../../AppSlice";
import { ConfigProvider, Button, Divider, Typography, Spin } from "antd";
import { colourIndex } from "./PathsPlot";
import { removeUgv } from "./dashboardSlice";

interface Props {
  ugv: UGVInfo;
}

export function UGVData(props:Props) {
  const { ugv } = props;
  const dispatch = useAppDispatch();

  const ws = useContext(WebsocketContext);

  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [loadingPaths, setLoadingPaths] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);

  const ugvTheme = {
    token:{
      colorPrimary: colourIndex[ugv.id].primary,
      colorTextBase: colourIndex[ugv.id].primary,
      colorBgBase: '#24292e',
      borderRadius: 3
    },
  };

  useEffect(() => {
    setShowLoad(ugv.state == ugvState.idle);
    if(ugv.state === ugvState.leave) setLoadingPaths(false);
  }, [ugv, setLoadingPaths, setShowLoad]);

  const onUGVReady = () => {
    setLoadingPaths(true);
    ws?.giveUgvPath(ugv.id);
  }

  const onUGVTaken = useCallback(() => {
    setIsTaken(true);
    ws?.takeUgv(ugv.id);
    dispatch(removeUgv(ugv.id));
  },[ugv]);

  return (
    <div key={ugv.id}>
      <ConfigProvider theme={ugvTheme}>
        <Divider style={{borderColor: colourIndex[ugv.id].primary}}> {ugv.name} </Divider>
        <Typography.Paragraph >Port: {ugv.port}</Typography.Paragraph>
        <Typography.Paragraph strong >State: {ugv.state}</Typography.Paragraph>
        {showLoad &&(
          <Spin spinning={loadingPaths}>
            <Button onClick={onUGVReady} key={ugv.id}>
              UGV Ready To Go
            </Button>
          </Spin>
        )}
        {ugv.state === ugvState.done && !isTaken && (
          <Button onClick={onUGVTaken} key={ugv.id}>
            UGV Removed
          </Button>
        )}
      </ConfigProvider>
    </div>
  );
}

export default UGVData;