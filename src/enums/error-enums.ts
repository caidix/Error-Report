/**
 * 基础报错类型枚举
 */
// type errorEnums = {
//   [anytype]: string;
//   JS_ERROR: string;
//   VUE_ERROR: string;
//   AJAX_ERROR: string;
//   CONSOLE_INFO: string;
// }
interface errorEnums {
  [errorType: string]: string;
}
export const ErrorEnums: errorEnums = {
  // 未知异常错误 
  UNKNOW_ERROR: 'unknow_error',
  // js异常错误
  JS_ERROR: 'js_error',
  // vue报错
  VUE_ERROR: 'vue_error',
  // ajax报错
  AJAX_ERROR: 'ajax_error',
  // 资源引用错误
  RESOURCE_ERROR: 'resource_error',
  // promise报错
  PROMISE_ERROR: 'promise_error',
  // js跨域报错
  CROSS_SCRIPT_ERROR: 'cross_script_error'
}

/**
 * 基础报错阶级枚举
 */
interface alertEnums {
  [alertType: string]: string;
}
export const AlertEnums: alertEnums = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info'
}
/**
 * 错误信息分包,后台正则分割依据
 */
export const ErrorInfoEnums = {
  ERROR_TYPE: {
    prop: '[error_type]',
    txt: '错误类别'
  },
  LOG_INFORMATION: {
    prop: '[log_information]',
    txt: '日志信息'
  },
  ERROR_SRC: {
    prop: '[error_src]',
    txt: '报错地址'
  },
  ERROR_STACK: {
    prop: '[error_stack]',
    txt: '错误栈'
  },
  ERROR_LINE: {
    prop: '[ERROR_LINE]',
    txt: '错误行号'
  },
  ERROR_COL: {
    prop: '[ERROR_COL]',
    txt: '错误列号'
  },
  OTHER_ERROR_INFO: {
    prop: '[other_error_info]',
    txt: '其他错误参数'
  }
}