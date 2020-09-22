import ErrorMonitor from "../error/error-monitor";
import { ErrorEnums, AlertEnums } from "../enums/error-enums";
import { errorOptionTypes } from "../types/index";
class PromiseError extends ErrorMonitor {
  public constructor(options: errorOptionTypes) {
    super(options);
  }
  public handleError() {
    window.addEventListener(
      "unhandledrejection",
      (e: PromiseRejectionEvent) => {
        try {
          if (!e || !e.reason) {
            return;
          }
          console.log("promise报错:\n", e);
          e.preventDefault();
          if (e.reason.config && e.reason.config.url) {
            this.url = e.reason.config.url;
          } else {
            this.url = window.location.href;
          }
          this.errorAlert = AlertEnums.WARN;
          this.errorType = ErrorEnums.PROMISE_ERROR;
          this.msg = e.reason;
          this.handleReportError();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      true
    ); //捕获
  }
}
export default PromiseError;
