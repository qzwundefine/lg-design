import { Button } from 'antd';
import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => (
  <h4>
    <Button>{props.title}</Button>
  </h4>
);

export default Foo;
