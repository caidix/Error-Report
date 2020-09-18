import ErrorMonitor from '../error/error-monitor';
import { ErrorEnums, AlertEnums } from '../enums/error-enums';
import { errorOptionTypes } from '../types/index';
/**
 * Ajax的监听主要是为了发现服务接口返回值的问题
 * abort：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
 * error：由于错误导致外部资源无法加载时触发。
 * load：外部资源加载成功时触发。
 * loadstart：外部资源开始加载时触发。
 * loadend：外部资源停止加载时触发，发生顺序排在error、abort、load等事件的后面。但却不提供进度结束的原因
 * progress：外部资源加载过程中不断触发。
 * timeout：加载超时时触发。
 */
class AjaxError extends ErrorMonitor {
  public constructor(options: errorOptionTypes) {
    super(options)
  }
  // 重写Send方法
  public handleError() {
    if (!window || !window.XMLHttpRequest) return;
    const XmlSend = window.XMLHttpRequest.prototype.send;
    /**
     * currentTarget 返回当前触发事件的元素/ target 返回触发事件触发的源头元素
     */
    const _handleFunc = (e: ProgressEvent) => {
      const target: any = e.target;
      if (target && target.status !== 200) {
        console.log('ajax出错:', target)
        this.errorType = ErrorEnums.AJAX_ERROR; //错误类型
        this.errorAlert = AlertEnums.WARN; //错误等级
        this.msg = target.response;
        this.url = target.responseURL;
        this.errorStack = {
          status: target.status,
          statusText: target.statusText,
          eventType: e.type,
          // method: target.fundebugTemp.
        }
      }
    }
    XMLHttpRequest.prototype.send = function (...argument: any) {
      console.log(argument)
      this.addEventListener('error', _handleFunc, false);
      this.addEventListener('load', _handleFunc, false);
      this.addEventListener('abort', _handleFunc, false);
      this.addEventListener('timeout', _handleFunc, false);
      return XmlSend.apply(this, argument);
    }
  }
}
export default AjaxError;