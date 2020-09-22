import { performanceTypes } from "../types/index";
import { TIMEOUT } from "../utils/index";
import getPageLoadTiming from "./performance-timing";
declare const window: Window & {
  requestIdleCallback: any;
};
export class PerformanceMonitor {
  private report: boolean; // 页面性能上报地址
  private reportUrl: string; // 页面性能上报地址
  private resource: boolean; // 页面资源超时上报地址
  private method: string; //请求方法
  private timeout: number; // 超时时间毫秒
  public constructor() {
    this.report = true;
    this.reportUrl = "";
    this.method = "POST";
    this.resource = false;
    this.timeout = TIMEOUT;
  }
  init(options: performanceTypes) {
    if (options.report && !options.reportUrl) {
      console.error("如需上报，上报地址为必填!");
    }
    this.reportUrl = options.reportUrl || this.reportUrl;
    this.method = options.method || this.method;
    this.resource = options.resource || this.resource;
    this.timeout = options.timeout || this.timeout;
    setTimeout(() => {
      getPageLoadTiming(options);
    }, TIMEOUT);
  }
  performance(options: performanceTypes) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(getPageLoadTiming(options));
    } else {
      setTimeout(() => {
        getPageLoadTiming(options);
      }, TIMEOUT);
    }
  }
}
