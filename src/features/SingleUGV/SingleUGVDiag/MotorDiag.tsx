import { useState, useCallback } from 'react';
import { Row, Space, Modal, Form, Slider, InputNumber, Button, Popconfirm } from 'antd';
import { SettingOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { selectNumOfDiagStates } from '../singleUGVSelector';
import { setNumOfDiagState, clearDiagState } from '../singleUGVSlice';
import { Outlet } from 'react-router-dom';

interface Values {
  lineSize: number,
  numPointsToSave: number,
}

export function UGVMotorDiag() {
    const dispatch = useAppDispatch();

    const numPointsToSave = useAppSelector(selectNumOfDiagStates); 
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [lineSize, setLineSize] = useState<number>(5);
    
    const [form] = Form.useForm();
  
    const onOk = useCallback((e: any) => {
      form.submit();
      setModalVisible(false);
    },[form]);
  
    const onCancel = useCallback(() => {
      setModalVisible(false);
      form.resetFields();
    },[])
  
    const onSubmit = useCallback((values: Values) => {
      setLineSize(values.lineSize);
      dispatch(setNumOfDiagState(values.numPointsToSave));
    }, []);
  
    const onClearData = useCallback(()=> {
      dispatch(clearDiagState());
    },[]);


  return (
    <>
      <Row style={{padding: ' 0px 20px'}}>
        <Space wrap>
          <Popconfirm
            title="Confirm Clear"
            description="only will clear data for both diagnostic pages"
            onConfirm={onClearData}
          >
            <Button>
              Clear Data
            </Button>
          </Popconfirm>
          <Button onClick={()=>setModalVisible(true)}>
            <SettingOutlined />
          </Button>
        </Space>
      </Row>
      
      <Outlet context={lineSize}/>

      <Modal title="Path Plot Settings" open={modalVisible} onOk={onOk} onCancel={onCancel}>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name="lineSize" label="Set Size of plot lines/symbols" labelCol={{ span: 24 }} initialValue={lineSize}>
            <Slider max={10}/>
          </Form.Item>
          <Form.Item name="numPointsToSave" label="Set maximum points to show" labelCol={{ span: 24 }} initialValue={numPointsToSave}>
            <InputNumber min={1}/>
          </Form.Item>
          <p>*Changes will only affect plots on this page</p>
        </Form>
      </Modal>
    </>
  );
}

export default UGVMotorDiag;
