import { ErrorEnums, AlertEnums, ErrorInfoEnums } from '../enums/error-enums';
import BrowserInfo from '../browser/index';
import { ReportBus } from '../utils/reportBus';
import { errorOptionTypes } from '../types/index';
class ErrorMonitor {
  public url: string | undefined;  // 报错地址
  public line: string | number | undefined; // 报错行
  public col: string | number | undefined; // 报错列
  public errorType: string; // 报错数据类型
  public errorAlert: string; // 报错类型
  public errorStack: any; // 报错堆栈
  public msg: string | Event; // 错误信息
  public reportUrl: string; // 上报地址
  public extendsMsg?: any; // 上报额外信息
  public method?: string; // 上报方式，get请求，图片上报
  constructor(options: errorOptionTypes) {
    this.errorType = ErrorEnums.UNKNOW_ERROR; //错误类型
    this.errorAlert = AlertEnums.INFO; //错误等级
    this.msg = ''; //错误信息
    this.url = ''; //错误信息地址
    this.line = ''; //行数
    this.col = ''; //列数
    this.errorStack = ''; //错误堆栈
    this.reportUrl = options.reportUrl;
    this.extendsMsg = options.extendsMsg || {};
    this.method = options.method || 'POST';
  }
  handleReportError() {
    try {
      const errorInfo = this.handleErrorInfo();
      ReportBus.on(() => {
        if (this.method === 'img') {
          ReportBus.imageReport(this.reportUrl, errorInfo);
        } else {
          ReportBus.ajaxReport(this.reportUrl, errorInfo);
        }
      })
      setTimeout(() => {
        !ReportBus.isEmit && ReportBus.emit();
      }, 200)
    } catch (error) {
      console.log(error);
    }
  }
  handleErrorInfo() {
    const errorInfo: any = {};
    try {
      if (!this.msg || !this.url) {
        console.log(`错误信息:${this.msg},或错误地址: ${this.url}不存在`)
        return;
      }
      if (!this.reportUrl ||
        this.url.toLowerCase().indexOf(
          this.reportUrl.toLowerCase()
        ) > -1) {
        console.error('上报地址有误!'); return;
      }
      let txt = ErrorInfoEnums.ERROR_TYPE.prop + ': ' + this.errorType + '\r\n';
      txt += ErrorInfoEnums.LOG_INFORMATION.prop + ': ' + this.msg + '\r\n';
      txt += ErrorInfoEnums.ERROR_SRC.prop + ': ' + encodeURIComponent(this.url) + '\r\n';
      switch (this.errorType) {
        case ErrorEnums.JS_ERROR:
          txt += ErrorInfoEnums.ERROR_LINE.prop + ': ' + this.line + '\r\n';
          txt += ErrorInfoEnums.ERROR_COL.prop + ': ' + this.col + '\r\n';
          if (this.errorStack && this.errorStack.stack) {
            txt += ErrorInfoEnums.ERROR_STACK.prop + ': ' + this.errorStack.stack + '\r\n';
          }
          break;
        default:
          txt += ErrorInfoEnums.OTHER_ERROR_INFO.prop + JSON.stringify(this.errorStack) + '\r\n';
          break;
      }
      errorInfo.info = txt;
      errorInfo.happenTime = new Date().getTime();
      errorInfo.errorType = this.errorType;
      errorInfo.errorAlert = this.errorAlert;
      errorInfo.title = document.title || '';
      errorInfo.userPlatInfo = JSON.stringify(BrowserInfo.get());
      return errorInfo;
    } catch (error) {
      console.log(error)
    }
  }
}
export default ErrorMonitor;