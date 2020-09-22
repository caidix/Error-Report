import Performance from "./performance";
import { ReportBus } from "../utils/reportBus";
import { TIMEOUT } from "../utils/index";

type timingTypes = {
  [timingType: string]: number | unknown;
};
type resourceListTypes = {
  js?: number;
  css?: number;
  img?: number;
  timeOrigin?: PerformanceEntry;
  timeout?: any;
};
type reportOptionTypes = {
  timing?: timingTypes;
  resource?: resourceListTypes;
  other?: any;
};
type resourceTypes = { name: string; startTime: number; responseEnd: number };
const getPageLoadTiming = (options: any) =>
  new Promise((resolve, reject) => {
    if (Performance.isPerformance) {
      console.log("当前浏览器不兼容，最好切换至谷歌浏览器调试");
      return;
    }
    const timing: PerformanceTiming = Performance.timing;
    const loadTime = (timing.loadEventEnd - timing.loadEventStart) / 1000;
    if (loadTime < 0) {
      setTimeout(() => resolve(getPageLoadTiming(options)), 200);
      return;
    }
    const reportOptions: reportOptionTypes = {};
    /**
     * 获取性能相关数据(s)
     * 白屏时间: 即用户拿到你的资源占用的时间
     * DNS查询时间: DNS 预加载做了么？ -- 页面内是不是使用了太多不同的域名导致域名查询的时间太长？
     * TCP链接完成时间: TCP 建立连接完成握手的时间
     * 内容加载完成的时间:即HTTP请求响应完成时间 -- 页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
     * 页面加载完成时间:这几乎代表了用户等待页面可用的时间
     * onload事件时间:执行 onload 回调函数的时间 -- onload执行时间过长 -- 是否onload操作过多
     */

    const timingData: timingTypes = {};
    timingData["白屏时间"] =
      (timing.responseStart - timing.navigationStart) / 1000;
    timingData["重定向时间"] =
      (timing.redirectEnd - timing.redirectStart) / 1000;
    timingData["DNS查询时间"] =
      (timing.domainLookupEnd - timing.domainLookupStart) / 1000;
    timingData["DNS缓存时间"] =
      (timing.domainLookupStart - timing.fetchStart) / 1000;
    timingData["TCP链接完成时间"] =
      (timing.connectEnd - timing.connectStart) / 1000;
    timingData["内容加载完成的时间"] =
      (timing.responseEnd - timing.requestStart) / 1000;
    timingData["DOM开始加载前所花费时间"] =
      (timing.responseEnd - timing.navigationStart) / 1000;
    timingData["DOM加载完成时间"] =
      (timing.domComplete - timing.domLoading) / 1000;
    timingData["DOM结构解析完成时间"] =
      (timing.domInteractive - timing.domLoading) / 1000;
    timingData["脚本加载时间"] =
      (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart) /
      1000;
    timingData["卸载页面时间"] =
      (timing.unloadEventEnd - timing.unloadEventStart) / 1000;
    timingData["页面加载完成时间"] =
      (timing.loadEventEnd - timing.navigationStart) / 1000;
    timingData["onload事件时间"] = loadTime;
    reportOptions.timing = timingData;
    // 将所有数据移至基准点时间
    // const timeOrigin = Performance.getTimeOrigin();
    // for (const key in timing) {
    //   if (Object.prototype.hasOwnProperty.call(timing, key)) {
    //     timing[key] = timing[key] > 0 ? timing[key] - timeOrigin : timing[key];
    //   }
    // }
    if (options.resource) {
      // 获取页面加载资源数据
      const resource = Performance.getEntriesByType("resource");
      const resourceList: resourceListTypes = {
        js: 0,
        css: 0,
        img: 0,
        timeOrigin: Performance.getTimeOrigin(),
        timeout: Array<unknown>(),
      };
      resource.forEach((item: resourceTypes) => {
        const { startTime, responseEnd } = item;
        const timeout = options.timeout || TIMEOUT;
        if (/.js$/.test(item.name.toLowerCase())) {
          resourceList.js && resourceList.js++;
        } else if (/.gif|.jpe?g|.png$/.test(item.name.toLowerCase())) {
          resourceList.img && resourceList.img++;
        } else if (/.css$/.test(item.name.toLowerCase())) {
          resourceList.css && resourceList.css++;
        }
        if (responseEnd - startTime > timeout) {
          resourceList.timeout.push({
            name: item.name,
            timeout,
          });
        }
      });
      reportOptions.resource = resourceList;
      reportOptions.other = {
        title: document.title,
      };
    }
    console.log(reportOptions);
    // ReportBus.ajaxReport(options.url, reportOptions);
  });

/**
 * options 参数
 * 1. resource: true 携带页面资源超时等信息
 * 2. timeout: 不设置resource这个参数没必要 默认500
 */
export default getPageLoadTiming;
