import { useCallback, useEffect, useState, useContext } from "react";
import { useAppSelector, useAppDispatch, usePrevious } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { UGVInfo, ugvState } from "../../AppSlice";
import { clearUGVPath } from "./dashboardSlice";
import { ConfigProvider, Button, Divider, Typography, Spin } from "antd";
import { colourIndex } from "./PathsPlot";

interface Props {
  ugv: UGVInfo;
}

export function UGVData(props:Props) {
  const { ugv } = props;
  const dispatch = useAppDispatch();

  const prevUgv = usePrevious(ugv)

  const ws = useContext(WebsocketContext);

  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [loadingPaths, setLoadingPaths] = useState<boolean>(false);

  const ugvTheme = {
    token:{
      colorPrimary: colourIndex[ugv.id].primary,
      colorTextBase: colourIndex[ugv.id].primary,
      colorBgBase: '#24292e',
      borderRadius: 3
    },
  };

  useEffect(() => {
    if(!prevUgv) return;
    if(ugv.state === ugvState.idle && prevUgv.state === ugvState.return) {
      console.log(`returned ${ugv.id}`);
      dispatch(clearUGVPath(ugv.id));
    }
  },[ugv, prevUgv]);

  useEffect(() => {
    setShowLoad(ugv.state == ugvState.idle);
    if(ugv.state === ugvState.leave) setLoadingPaths(false);
  }, [ugv, setLoadingPaths, setShowLoad]);

  const onUGVReady = () => {
    setLoadingPaths(true);
    ws?.giveUgvPath(ugv.id);
  }

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
      </ConfigProvider>
    </div>
  );
}

export default UGVData;