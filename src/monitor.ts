import { errorMessageInterface } from "./types/index";
import BrowserInfo from "./browser/index";
import {
  JsError,
  ResourceError,
  VueError,
  PromiseError,
  AjaxError,
} from "./error/index";

export class Monitor {
  private jsError: Boolean;
  private promiseError: Boolean;
  private resourceError: Boolean;
  private ajaxError: Boolean;
  private vueError: Boolean;
  // private reportType: string;
  public constructor(params: any) {
    this.jsError = true;
    this.promiseError = true;
    this.ajaxError = true;
    this.resourceError = true;
    this.vueError = false;
  }
  init(options: errorMessageInterface) {
    this.jsError = options.jsError || this.jsError;
    this.promiseError = options.promiseError || this.promiseError;
    this.ajaxError = options.ajaxError || this.ajaxError;
    this.resourceError = options.resourceError || this.resourceError;
    this.vueError = options.vueError || this.vueError;
    // this.reportType = "";
    this.jsError && new JsError(options).handleError();
    this.resourceError && new ResourceError(options).handleError();
    this.vueError &&
      options.vue &&
      new VueError(options).handleError(options.vue);
    this.promiseError && new PromiseError(options).handleError();
    this.ajaxError && new AjaxError(options).handleError();
  }
}
