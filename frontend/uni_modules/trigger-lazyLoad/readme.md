# trigger-lazyLoad

## 属性说明

| 属性名       | 类型          | 默认值     | 说明                                                             |
| ------------ | ------------- | ---------- | ---------------------------------------------------------------- |
| height       | String        | 100%       | 图片高度，必须带尺寸单位（默认 100%）                            |
| src          | String        |            | 图片链接，不传的话会一直是加载中状态                             |
| width        | String        | 100%       | 图片宽度，必须带尺寸单位（默认 100%）                            |
| borderRadius | String        | 0          | 图片圆角，必须带尺寸单位                                         |
| minTimeOut   | String/Number | 300        | 当图片加载过快（存在缓存）至少显示多少毫秒加载动画               |
| showDistance | Object        | {bottom:0} | 当图片距离屏幕多少距离的时候开始加载，单位 px，可以是负数        |
| loadSrc      | String        |            | 加载中显示的图片，输入网络路径或绝对路径                         |
| errorSrc     | String        |            | 加载失败显示的图片，输入网络路径或绝对路径                       |
| effect       | String        | linear     | 过渡效果，可选值有：linear、ease、ease-in、ease-out、ease-in-out |
| duration     | String/Number | 300        | 图片加载成功后的过渡时间，单位毫秒                               |
| preview      | Boolean       | false      | 图片是否能点击预览                                               |


## 事件

| 事件名      | 触发时机                 |
| ----------- | ------------------------ |
| show        | 当图片进入页面时触发     |
| showSuccess | 当图片完全加载完毕时触发 |


## 示例代码

```html
	<trigger-lazyLoad src="https://img1.baidu.com/it/u=686601210,2945715740&fm=253&fmt=auto&app=120&f=JPE" />
```


### 注意事项 
1、组件默认高宽是100%,当传入高宽时需要携带单位，例如 width="100rpx"
2、组件是基于 intersectionObserver API 监听节点的相交情况实现懒加载，插件改的别人的插件在其基础上兼容了vue3和app和添加了些其他特新
