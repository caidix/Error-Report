import { keyValueProp } from '../types/index';
const returnType = (val: any) => Object.prototype.toString.call(val).slice(8, -1)
export const isFunction = (item: any): Boolean => returnType(item) === 'Function'
export const isArray = (item: any): Boolean => returnType(item) === 'Array'

export function mapEnumsValue(
  mateMessage: string,
  enums: keyValueProp[]
): string {
  if (!isArray(enums)) {
    console.warn('mapEunms must be Array-type, but this not');
    return '';
  }
  let result = '';
  for (const iterator of enums) {
    const { key, value } = iterator;
    if (isArray(key)) {
      for (const _key of key) {
        if (mateMessage.includes(_key)) {
          result = value;
        }
      }
    } else {
      if (mateMessage.includes(key)) {
        result = value;
      }
    }
  }
  return result;
}
export function mapListValue(key: string, enums: keyValueProp[]) {
  const res = enums.find(item => item.key === key);
  return res ? res.value : '';
}

/**
 * 系统版本
 */
export const platformTypes: any = {
  Windows: (userAgent: string) => {
    const result: string = userAgent.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
    const oldWindowsVersionMap: any = {
      '6.4': '10',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
      '6.0': 'Vista',
      '5.2': 'XP',
      '5.1': 'XP',
      '5.0': '2000'
    }
    return oldWindowsVersionMap[result] || result;
  },
  Android: (userAgent: string) => {
    return userAgent.replace(/^.*Android ([\d.]+);.*$/, '$1')
  },
  iOS: (userAgent: string) => {
    return userAgent.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
  },
  Debian: (userAgent: string) => {
    return userAgent.replace(/^.*Debian\/([\d.]+).*$/, '$1')
  },
  ['Windows Phone']: (userAgent: string) => {
    return userAgent.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
  },
  ['Mac OS']: (userAgent: string) => {
    return userAgent.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
  },
  WebOS: (userAgent: string) => {
    return userAgent.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
  }
}