import { Card } from 'antd';
import React, { type FC } from 'react';
import './index.css';

type GridLayoutItemProps = {
  /**
   * @children 数据源
   */
  children?: React.ReactNode | null;
};

const GridLayoutItem: FC<GridLayoutItemProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    <div className="gridLayoutItemContainer">
      <Card
        className="gridLayoutItemCard"
        bodyStyle={{
          width: '100%',
          height: restProps?.title ? 'calc(100% - 56px)' : '100%',
        }}
        {...restProps}
      >
        <div style={{ width: '100%', height: '100%' }}>{children}</div>
      </Card>
    </div>
  );
};

export default GridLayoutItem;
