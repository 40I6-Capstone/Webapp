import React, { useState } from 'react';
// plotly.js
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {

} from './singleUGVSlice';

import { Row, Col } from 'antd';

import SingleUGVPath from './UGVPath';
import UGVVel from './UGVV';
import './SingleUGV.css';

export function SingleUGVPage() {

  return (
    <>
      <Row className={"stretch-row"}>
        <Col span={12}>
          <SingleUGVPath />
        </Col>
        <Col span={12} className={"fill-col"}>
          <Row className={"stretch-row"}>
            <UGVVel/>
          </Row>
          <Row className={"stretch-row"}>
            <UGVVel/>
          </Row>
        </Col>
      </Row>
      {/* <Row>

      </Row> */}
    </>
  );
}
