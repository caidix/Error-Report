import ErrorMonitor from '../error/error-monitor';
import { ErrorEnums, AlertEnums } from '../enums/error-enums';
import { errorOptionTypes } from '../types/index';
class JsError extends ErrorMonitor {
  constructor(options: errorOptionTypes) {
    super(options)
  }
  handleError() {
    /**
     * window.onerror:JavaScript运行时错误（包括语法错误）发生时触发
     * 若该函数返回true，则阻止执行默认事件处理函数。
     * @param message 错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
     * @param source 发生错误的脚本URL（字符串）
     * @param lineno 发生错误的行号（数字）
     * @param colno 发生错误的列号（数字）
     * @param error Error对象（对象）
     */
    console.log('开始进行js监听')
    window.onerror = (message, source, lineno, colno, error) => {
      try {
        console.log('监听到js报错')
        this.errorType = ErrorEnums.JS_ERROR; //错误类型
        this.errorAlert = AlertEnums.WARN; //错误等级
        this.msg = message; //错误信息
        this.url = source; //错误信息地址
        this.line = lineno || ''; //行数
        this.col = colno || ''; //列数
        this.errorStack = error || ''; //错误堆栈
        this.handleReportError();
        return true; // 返回true异常才不会向上抛出
      } catch (error) {
        console.error('js异常错误', error)
      }
    }
  }
}
export default JsError;