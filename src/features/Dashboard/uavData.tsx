import { useCallback, useEffect, useContext } from "react";
import { useAppSelector, usePrevious } from '../../app/hooks';
import { WebsocketContext } from '../../App';
import { selectUAV } from "../../AppSelector";
import { Button, Divider, message, Typography } from "antd";


export function UAVData() {

  const ws = useContext(WebsocketContext);

  const uav = useAppSelector(selectUAV);
  
  const prevUav = usePrevious(uav);

  useEffect(() => {
    if(!prevUav) return;
    if(uav.battery <= 20 && prevUav.battery > 20) {
        message.warning("UAV is low on battery");
    } else if (uav.battery <= 10 && prevUav.battery > 10) {
        message.warning("UAV battery is critically low REPLACE NOW");
    }
  }, [uav, prevUav]);

  const onUAVReconnect = useCallback(() => {
    ws?.reconnectUav();
  },[ws]);
  
  return (
    <>
      <Divider> UAV </Divider>
      <Typography.Paragraph strong type={uav.battery<20?'danger':undefined} >Battery: {uav.battery}%</Typography.Paragraph>
      <Typography.Paragraph strong type={uav.battery<20?'danger':undefined}>Status: {uav.state}</Typography.Paragraph>
      {
        uav.state === 'Disconnected' && (
          <Button onClick={onUAVReconnect}>
            Reconnect UAV
          </Button>
        )
      }
    </>
  );
}

export default UAVData;