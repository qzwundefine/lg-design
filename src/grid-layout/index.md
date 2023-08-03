---
title: GridLayout
subtitle: 动态布局组件
order: 1
group:
  title: 布局
  order: 2
---

动态布局组件描述

```jsx
import { GridLayout, GridLayoutItem, EmptyModule } from 'lg-design-pro';

export default () => (
  <GridLayout>
    <GridLayoutItem key={'item1'} title="完单数">
      23456
    </GridLayoutItem>
    <GridLayoutItem key={'item2'} title="消单数">
      <EmptyModule />
    </GridLayoutItem>
  </GridLayout>
);
```
