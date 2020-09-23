import ErrorMonitor from './base-monitor';
import { ErrorEnums, AlertEnums } from '../enums/error-enums';
import { errorOptionTypes } from '../types/index';
/**
 * 资源加载错误
 *  bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
    currentTarget: null
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
    path: (6) [link, div#app, body, html, document, Window]
    returnValue: true
    srcElement: link
    target: link
    timeStamp: 
    type: "error"
 */
class ResourceError extends ErrorMonitor {
  public constructor(options: errorOptionTypes) {
    super(options)
  }
  public handleError() {
    window.addEventListener('error', (e: any) => {
      try {
        if (!e) { return; }
        const target = e.target || e.srcElement;
        // 目前只考虑 e.target.localName : link/script/img 的资源加载错误
        if (!(
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement
        )) { return; }
        console.log('resouce报错:\n', e);
        this.errorType = ErrorEnums.RESOURCE_ERROR;
        this.errorAlert = AlertEnums.ERROR;
        if (target instanceof HTMLLinkElement) {
          this.url = target.href;
        } else {
          this.url = target.src;
        }
        this.msg = `资源${target.localName}引用错误`;
        this.errorStack = target;
        this.handleReportError();
      } catch (error) {
        console.log(error);
      }
    }, true)
  }
}

export default ResourceError;