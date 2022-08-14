# 目的
主要支持异步加载script文件，支持超时自动取消，也支持延时加载

```js
import createAsyncScript from 'create-async-script';

createAsyncScript([{
  src: 'aaaa',
  timeout: 1000,
  delay: 10000,
  ...rest
}])

// src 为 script 的地址
// timeout 为 script 超时的时间单位为 ms，超时会自动取消
// delay 为延迟加载的时间单位为 ms
// ...rest 剩余参数为 src 属性的会被加到script属性上
// onLoad 事件
// onError 事件
```
