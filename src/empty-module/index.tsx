import { Card, Empty } from 'antd';
import React, { type FC } from 'react';
import './index.css';

type EmptyModuleProps = {
  /**
   * @title 标题
   */
  title?: string | undefined;
  /**
   * @description 描述
   */
  description?: string | undefined;
  /**
   * @image 图片地址
   */
  image?: string | undefined;
  /**
   * @imageStyle 图片样式
   */
  imageStyle?: React.CSSProperties | undefined;
};

const EmptyModule: FC<EmptyModuleProps> = (props) => {
  const { title, description, image, imageStyle } = props;

  return (
    <Card
      title={title || '待开发模块'}
      className="container"
      bodyStyle={{
        width: '100%',
        height: 'calc(100% - 56px)',
      }}
    >
      <Empty
        image={image || Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={imageStyle || { height: 30 }}
        description={<span>{description || '敬请期待'}</span>}
      />
    </Card>
  );
};

export default EmptyModule;
