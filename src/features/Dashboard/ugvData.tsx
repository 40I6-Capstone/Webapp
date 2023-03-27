import { useCallback, useEffect, useState, useContext } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { UGVInfo, ugvState } from "../../AppSlice";
import { ConfigProvider, Button, Divider, Typography } from "antd";
import { colourIndex } from "./PathsPlot";

interface Props {
  ugv: UGVInfo;
}

export function UGVData(props:Props) {
  const { ugv } = props;

  const ws = useContext(WebsocketContext);

  const [showLoad, setShowLoad] = useState<boolean>(false);

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
  }, [ugv, showLoad]);

  const onUGVReady = useCallback(() => {
    ws?.giveUgvPath(ugv.id);
  },[]);

  return (
    <div key={ugv.id}>
      <ConfigProvider theme={ugvTheme}>
        <Divider style={{borderColor: colourIndex[ugv.id].primary}}> {ugv.name} </Divider>
        <Typography.Paragraph strong >State: {ugv.state}</Typography.Paragraph>
        {showLoad &&(
          <Button onClick={onUGVReady}>
            UGV Ready To Go
          </Button>
        )}
      </ConfigProvider>
    </div>
  );
}

export default UGVData;