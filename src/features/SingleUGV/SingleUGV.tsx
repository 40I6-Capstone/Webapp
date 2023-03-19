import React, { useCallback, useState } from 'react';
import { Row, Col, Space, Modal, Form, Slider, Checkbox, InputNumber, Button, Popconfirm } from 'antd';
import { SettingOutlined } from '@ant-design/icons'

import { clearDataState, setNumOfState } from './singleUGVSlice';
import { selectNumOfStates } from './singleUGVSelector';
import SingleUGVPath from './UGVPath';
import UGVVel from './UGVV';
import UGVHead from './UGVH';

import './SingleUGV.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface Values {
  markerOutline: boolean,
  lineSize: number,
  numPointsToSave: number,
}

export function SingleUGVPage() {

  const dispatch = useAppDispatch();

  const numPointsToSave = useAppSelector(selectNumOfStates); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [lineSize, setLineSize] = useState<number>(5);
  const [markerOutline, setMarkerOutline] = useState<boolean>(true);
  // const [numPointsToSave, setNumPointsToSave] = useState<number>(15);

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
    setMarkerOutline(values.markerOutline);
    dispatch(setNumOfState(values.numPointsToSave));
  }, []);

  const onClearData = useCallback(()=> {
    dispatch(clearDataState());
  },[]);

  return (
    <>
      <Row style={{padding: ' 0px 20px'}}>
        <Space wrap>
          <Popconfirm
            title="Confirm Clear"
            description="only will clear data for this page"
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
      <Row className={"stretch-row"}>
        <Col span={12}>
          <Row className={"stretch-row"}> 
            <SingleUGVPath lineSize={lineSize} markerOutline={markerOutline} />
          </Row>
        </Col>
        <Col span={12} className={"fill-col"}>
          <Row className={"stretch-row"}>
            <UGVVel lineSize={lineSize} />
          </Row>
          <Row className={"stretch-row"}>
            <UGVHead lineSize={lineSize} />
          </Row>
        </Col>
      </Row>
      <Modal title="Path Plot Settings" open={modalVisible} onOk={onOk} onCancel={onCancel}>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name="markerOutline" label="Add outline to symbols" valuePropName="checked" initialValue={markerOutline}>
            <Checkbox />
          </Form.Item>
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

export default SingleUGVPage;