'use strict';

const path = require('path');

/**
 * 默认配置
 */
module.exports = (appInfo) => {
  const config = {};


  /**
   * 主窗口
   */
  config.windowsOption = {
    title: '简传',
    width: 1366,
    height: 768,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      //webSecurity: false,
      contextIsolation: false, // false -> 可在渲染进程中使用electron的api，true->需要bridge.js(contextBridge)
      nodeIntegration: true,
      //preload: path.join(appInfo.baseDir, 'preload', 'bridge.js'),
    },
    frame: true,
    show: false,
    icon: path.join(appInfo.home, 'public', 'images', 'logo-32.png'),
  };

  /**
   * ee框架日志
   */
  config.logger = {
    encoding: 'utf8',
    level: 'INFO',
    outputJSON: false,
    buffer: true,
    enablePerformanceTimer: false,
    rotator: 'day',
    appLogName: 'ee.log',
    coreLogName: 'ee-core.log',
    errorLogName: 'ee-error.log'
  }

  /**
   * 内置socket服务
   */
  config.socketServer = {
    enable: false,
    port: 7070,
    path: "/socket.io/",
    connectTimeout: 45000,
    pingTimeout: 30000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8,
    transports: ["polling", "websocket"],
    cors: {
      origin: true,
    }
  };

  /**
   * 内置http服务
   */
  config.httpServer = {
    enable: true,
    https: {
      enable: false,
      key: '/public/ssl/localhost+1.key',
      cert: '/public/ssl/localhost+1.pem'
    },
    host: '0.0.0.0', // 允许所有ip访问
    port: 7071,
    cors: {
      origin: "*"
    },
    body: {
      multipart: true,
      formidable: {
        keepExtensions: true,
        maxFileSize: 500 * 1024 * 1024 * 1024, // 500G上限
      }
    },
    filterRequest: {
      uris: [
        'favicon.ico'
      ],
      returnData: ''
    }
  };

  /**
   * 主进程
   */
  config.mainServer = {
    protocol: 'http://',
    indexPath: '/public/dist/index.html',
    open: true // 放开0.0.0.0
    // host: 'localhost', // 使用默认配置
  };


  /**
   * 硬件加速
   */
  config.hardGpu = {
    enable: true
  };

  /**
   * 异常捕获
   */
  config.exception = {
    mainExit: false,
    childExit: true,
    rendererExit: true,
  };

  /**
   * jobs
   */
  config.jobs = {
    messageLog: true
  };

  /**
   * 插件功能
   */
  config.addons = {
    window: {
      enable: true,
    },
    tray: {
      enable: true,
      title: '简传',
      icon: '/public/images/tray.png'
    },
    security: {
      enable: true,
    },
    awaken: {
      enable: true,
      protocol: 'ee',
      args: []
    },
    autoUpdater: {
      enable: false,
      windows: true,
      macOS: true,
      linux: true,
      options: {
        provider: 'generic',
        url: 'https://env-00jxg9oibm7l.normal.cloudstatic.cn/easy-send/'
      },
      force: false,
    }
  };

  return {
    ...config
  };
}
