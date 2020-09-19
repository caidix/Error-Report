# :tada: 异常数据上报

:clown_face:有借鉴各大开源 git 库

## :bookmark:使用

```
import { Monitor } from "../CD-Monitor/src/index";
new Monitor().init({
  reportUrl: "http://localhost:3000",
  vueError: true,
  vue: Vue,
});
```

---

init 函数参数:
| 参数名 | 功能 | 默认值 | 是否必填 |
| ---- | :--: | ---: | ---: |
| reportUrl | 发送上报的地址 | | true |
| jsError | 是否上报 js 报错 | true | false |
| promiseError | 是否上报 promise 报错 | true | false |
| ajaxError | 是否上报 ajax 报错 | true | false |
| resourceError | 是否上报 资源引入 报错 | true | false |
| vueError | 是否上报 vueError 报错，需要引入 vue 实例 | true | false |
| vue | 使用 vueError 时使用 | true | false |
| reportType(暂未开发) | 上报方式：支持 IMG/POST 上报 | 'post' | 'img/post' |

## :bug:缺陷

1. 目前没有对性能方面做上报及检测
2. 目前没有使用打包工具对其打包压缩
3. 目前代码书写及流程仍需优化
