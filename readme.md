# :tada: 异常/性能监控工具

:clown_face:有借鉴各大开源 git 库, 目前仅自己使用，没有放到npm库占用资源。需要自己打包。

# :bookmark:目录
1.   [异常监控](#jump)
2.   [性能监控](#jump2)

--- 

# <span id="jump">异常监控</span>
## :bookmark:使用

```
import { ErrorMonitor } from "../dist/index";
new ErrorMonitor().init({
  reportUrl: "http://localhost:3000",
  vueError: true,
  vue: Vue,
});
```

---

init 函数参数:
| 参数名        |                   功能                    | 默认值 |   是否必填 |
|---------------|:-----------------------------------------:|-------:|-----------:|
| reportUrl     |              发送上报的地址               |        |       true |
| jsError       |             是否上报 js 报错              |   true |      false |
| promiseError  |           是否上报 promise 报错           |   true |      false |
| ajaxError     |            是否上报 ajax 报错             |   true |      false |
| resourceError |          是否上报 资源引入 报错           |   true |      false |
| vueError      | 是否上报 vueError 报错，需要引入 vue 实例 |   true |      false |
| vue           |           使用 vueError 时使用            |   true |      false |
| method        |       上报方式：支持 IMG/POST 上报        | 'POST' | 'img/POST' |

---

## :wrench:携带发送参数
| 参数名       |                      功能                      |
|--------------|:----------------------------------------------:|
| info         | 传递报错基本信息，可用错误信息分包枚举进行分割 |
| happenTime   |        发生时间(比实际发生时间要慢一些)        |
| errorType    |                  错误枚举类型                  |
| errorAlert   |                  错误告警级别                  |
| title        |                当前报错页面标题                |
| userPlatInfo |             报错用户浏览器基本信息             |

### 错误对应枚举
```js
  // 未知异常错误 
 UNKNOW_ERROR: 'unknow_error',
  // js异常错误
  JS_ERROR: 'js_error',
  // vue报错
  VUE_ERROR: 'vue_error',
  // ajax报错
  AJAX_ERROR: 'ajax_error',
  // 资源引用错误
  RESOURCE_ERROR: 'resource_error',
  // promise报错
  PROMISE_ERROR: 'promise_error',
  // js跨域报错
  CROSS_SCRIPT_ERROR: 'cross_script_error'
```

---

### 错误信息分包,后台正则分割依据
```js
 ERROR_TYPE: {
    prop: '[error_type]',
    txt: '错误类别'
  },
  LOG_INFORMATION: {
    prop: '[log_information]',
    txt: '日志信息'
  },
  ERROR_SRC: {
    prop: '[error_src]',
    txt: '报错地址'
  },
  ERROR_STACK: {
    prop: '[error_stack]',
    txt: '错误栈'
  },
  ERROR_LINE: {
    prop: '[ERROR_LINE]',
    txt: '错误行号'
  },
  ERROR_COL: {
    prop: '[ERROR_COL]',
    txt: '错误列号'
  },
  OTHER_ERROR_INFO: {
    prop: '[other_error_info]',
    txt: '其他错误参数'
  }
```
<u>OTHER_ERROR_INFO</u>:其他错误参数随着错误类型的不同会有不同的传入，如果需要甄别请看源码或根据类型枚举及切割prop做数据的区分。

## :bug:缺陷

1. 目前没有对性能方面做上报及检测
2. 不兼容ie9以下浏览器
3. 目前代码书写及流程仍需优化,Typescript用得太少，代码并不优雅

## :construction:source-map
> source-map要在服务端进行，sourcemap获取到该stack信息之后，在服务端配置好前端代码打包压缩的文件路径，并配合sourse-map使用获取原行号信息。
会传递到错误行、列号的错误类型：js-Error，vue-Error
---
```js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const sourceMap = require('source-map');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
// 定义POST接口
router.get('/error/', async function(req, res) {
    // 获取前端传过来的报错对象
    let error = JSON.parse(req.query.error);
    let url = error.scriptURI; // 压缩文件路径
    if (url) {
        let fileUrl = url.slice(url.indexOf('client/')) + '.map'; // map文件路径
        // 解析sourceMap
        let consumer = await new sourceMap.SourceMapConsumer(fs.readFileSync(resolve('../' + fileUrl), 'utf8')); // 返回一个promise对象
        // 解析原始报错数据
        let result = consumer.originalPositionFor({
            line: error.lineNo, // 压缩后的行号
            column: error.columnNo // 压缩后的列号
        });
        console.log(result);
    }
});
module.exports = router;
```

# <span id="jump2">性能监控</span>
> 页面onload之后将会在控制台输出相关性能信息。
## :bookmark:使用

```
import { PerformanceMonitor } from "../dist/index";
new PerformanceMonitor().init({
  url: xxx,
  method: "POST",
  resource: true,
  timeout: 1000
});
```
---

init参数：
| 参数名   |                          功能                           | 默认值 |   是否必填 |
|----------|:-------------------------------------------------------:|-------:|-----------:|
| url      |           发送上报的地址，不填写默认为不上报            |        |      false |
| resource |           是否获取/上报携带页面资源超时等信息           |  false |      false |
| timeout  | 超过多少毫秒算是超时信息，resource为false时没有传的必要 |    500 |      false |
| method   |              上报方式：支持 GET/POST 上报               | 'POST' | 'GET/POST' |

---

## :bug:缺陷
1. 暂时没有做大屏图标展示性能报表。
