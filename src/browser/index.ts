import {
  engineEnums,
  browserEnums,
  platformEnums,
  equipmentEnums,
  languageEnums,
  OTHER
} from '../enums/index';
import { navigatorFuncProps } from '../types/index';
import { mapEnumsValue, mapListValue, platformTypes } from '../utils/index';
const BrowserInfo = (function (this: any) {
  // windows,使用self只读
  const _window = self || this || {};
  // navigator浏览器
  const _navigator: any = _window.navigator;
  return {
    get: () => getNavigatorProps(_navigator, _window)
  };
})()

function getNavigatorProps(_navigator: any, _window: any) {
  if (!_navigator) {
    return {}
  }
  const navigatorFuncProps: navigatorFuncProps = {
    userAgent: _navigator.userAgent,
    getNetWork() {
      return _navigator.connection && _navigator.connection.effectiveType;
    },
    getPlatform() {
      const platform = mapEnumsValue(this.userAgent, platformEnums) || _navigator.platform;
      let platformVersion = '';
      Object.keys(platformTypes).forEach(key => {
        if (key === platform) {
          platformVersion = platformTypes[key](this.userAgent);
        }
      });
      return platform + '_' + platformVersion;
    },
    getBrowserType() {
      return mapEnumsValue(this.userAgent, browserEnums)
    },
    getEquipment() {
      return mapEnumsValue(this.userAgent, equipmentEnums) || 'PC';
    },
    getLanguage() {
      return mapListValue(_navigator.language, languageEnums)
    },
    getScreenDirection() {
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries
      // to set up a query list that determines if the device is in landscape or portrait orientation
      return _window.matchMedia("(orientation: portrait)").matches ? '竖屏' : '横屏';
    }
  }
  return {
    network: navigatorFuncProps.getNetWork(),
    platform: navigatorFuncProps.getPlatform(),
    browser: navigatorFuncProps.getBrowserType(),
    equipment: navigatorFuncProps.getEquipment(),
    language: navigatorFuncProps.getLanguage(),
    screenDirection: navigatorFuncProps.getScreenDirection(),
    screenHeight: _window.screen.height,
    screenWidth: _window.screen.width,
    userAgent: navigatorFuncProps.userAgent
  }
}

export default BrowserInfo;


