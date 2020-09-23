export type errorOptionTypes = {
  [errorInfo: string]: any;
  reportUrl: string;
  extendsMsg?: any;
  vue?: any;
};

export type errorMessageInterface = errorOptionTypes & {
  // url: string;
  // message: string;
  // line?: string | number;
  // col?: string | number;
  // reportUrl: string;
  jsError?: Boolean;
  promiseError?: Boolean;
  resourceError?: Boolean;
  ajaxError?: Boolean;
  vueError?: Boolean;
};
export interface keyValueProp {
  key: any;
  value: string;
}

export type enumsType = Array<string>;

type stringArr = string[] | string;
export interface navigatorFuncProps {
  userAgent: any;
  /**
   * 获取网络信息
   */
  getNetWork(): string;
  /**
   * 获取运行浏览器的操作系统和（或）硬件平台
   */
  getPlatform(): stringArr;
  /**
   * 获取浏览器类型
   */
  getBrowserType(): stringArr;
  /**
   * 获取设备类型
   */
  getEquipment(): stringArr;
  /**
   * 浏览器语言
   */
  getLanguage(): string;
  /**
   * 获取设备横竖屏状态
   */
  getScreenDirection(): string;
}

/**
 * TODO： 页面性能type
 */
export type performanceTypes = {
  url?: string; // 页面性能上报地址不填写为不上报
  method?: string; //请求方法
  resource?: boolean; // 携带页面资源超时等信息
  timeout?: number; // 超时时间毫秒 不设置resource这个参数没必要
};
