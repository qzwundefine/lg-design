import React, { type FC } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './index.css';
const ResponsiveGridLayout = WidthProvider(Responsive);

type GridLayoutProps = {
  /**
   * @children 子元素
   */
  children?: React.ReactNode | null;
};

const GridLayout: FC<GridLayoutProps> = (props) => {
  const { children, ...restProps } = props;

  // 渲染子元素
  const renderItem = (items: React.ReactNode) => {
    if (!items) return null;
    if (Array.isArray(items)) {
      return items.map((item, index) => {
        if (!item) return null;
        if (restProps?.layout && Array.isArray(restProps?.layout)) {
          const extraProps = restProps?.layout.find(
            (layoutItem: any) =>
              layoutItem?.i === item.key || layoutItem?.i === index + 1,
          );
          return (
            <div
              key={item.key || index + 1}
              {...(extraProps && { 'data-grid': extraProps })}
            >
              {item}
            </div>
          );
        } else {
          return <div key={item.key || index + 1}>{item}</div>;
        }
      });
    } else {
      if (restProps?.layout && Array.isArray(restProps?.layout)) {
        const extraProps = restProps?.layout.find(
          (layoutItem: any) =>
            layoutItem?.i === items.key || layoutItem?.i === 1,
        );
        return (
          <div
            key={items.key || 1}
            {...(extraProps && { 'data-grid': extraProps })}
          >
            {items}
          </div>
        );
      } else {
        return <div key={items.key || 1}>{items}</div>;
      }
    }
  };

  return (
    <div className="gridLayoutContainer">
      <ResponsiveGridLayout {...restProps}>
        {renderItem(children)}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;
