'use strict';

/**
 * 开发环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  config.openDevTools = true;

  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = false;

  /**
   * 远程模式-web地址
   */
  config.remoteUrl = {
    enable: true,
    url: 'http://localhost:5173'
  };

  /**
   * jobs
   */
  config.jobs = {
    messageLog: true
  };

  return {
    ...config
  };
};
