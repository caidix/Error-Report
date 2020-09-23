import { performanceTypes } from "./types/index";
import getPageLoadTiming from "./performance/performance-timing";
// declare const window: Window & {
//   requestIdleCallback: any;
// };

/**
 * PerformanceMonitor: 日后可扩展性能图谱表单浮动于当前页前。
 * when getPageLoadTiming.then
 */
export class PerformanceMonitor {
  public constructor() { }
  init(options: performanceTypes) {
    // window.requestIdleCallback
    window.onload = () => {
      getPageLoadTiming(options);
    }
  }
}
