/**
 * 重定performance对象，以兼容不同的浏览器
 */
const Performance: any = window.performance || {
  isPerformance: true,
  now() {
    return Date.now();
  },
};
/**
 * usedJSHeapSize：JS对象(包括V8引擎内部对象)占用的内存数
 * totalJSHeapSize：可使用的内存
 * jsHeapSizeLimit：内存大小限制
 */
Performance.getMemory = () =>
  Performance.memory || {
    usedJSHeapSize: 0,
    jsHeapSizeLimit: 0,
    totalJSHeapSize: 0,
  };
/**
 * 默认事件基准点
 */
Performance.getTimeOrigin = () => Performance.timeOrigin || 0;
/**
 * 当前页面请求资源信息Timing
 */
Performance.getEntries =
  Performance.getEntries ||
  function () {
    return [];
  };
/**
 * 返回指定页面资源信息
 */
Performance.getEntriesByType =
  Performance.getEntriesByType ||
  function () {
    return [];
  };

export default Performance;
