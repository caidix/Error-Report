import ErrorMonitor from '../error/error-monitor';
import { ErrorEnums, AlertEnums } from '../enums/error-enums';
import { errorOptionTypes } from '../types/index';

/**
 * Vue 全局钩子errorHandler
 * err, vm, info , 只在 2.2.0+ 可用
 */
type messageData = {
  stack: string | undefined;
  info: any;
  componentName?: any;
  propsData?: Object | undefined;
}
class VueError extends ErrorMonitor {
  public constructor(options: errorOptionTypes) {
    super(options)
  }
  private formatComponentName(vm: any) {
    if (vm.$root === vm) return 'root';
    var name = vm._isVue
      ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
      : vm.name;
    return (
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file
        ? ' at ' + (vm.$options && vm.$options.__file)
        : '')
    );
  }
  public handleError(Vue: any) {
    if (!Vue) {
      console.error('请传入正确的vue实例!');
      return;
    }
    try {
      Vue.config.errorHandler = (err: Error, vm: any, info: any) => {
        this.errorType = ErrorEnums.VUE_ERROR;
        this.errorAlert = AlertEnums.WARN;
        const data: messageData = {
          stack: err.stack,
          info: info,
        };
        console.log('vue报错:\n', err);
        if (Object.prototype.toString.call(vm) === '[object Object]') {
          data.componentName = this.formatComponentName(vm);
          data.propsData = vm.$options.propsData;
        }
        this.msg = err.message;
        this.url = window.location.href;
        this.errorStack = data;
        this.handleReportError();
      }
    } catch (error) {
      console.log('vue异常监听出错:', error);
    }
  }
}
export default VueError;