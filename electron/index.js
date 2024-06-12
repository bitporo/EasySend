const { Application } = require('ee-core');
const { app, Menu } = require('electron')
const http = require('http');

class Index extends Application {

  constructor() {
    super();
    // this === eeApp;
    const template = [
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
        ]
      },
    ]
    const clients = new Map(); // 用来存储所有连接的客户端
    const server = http.createServer((req, res) => {
      if (req.url === '/sse') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*'
        });

        // 将新连接的客户端添加到列表
        const clientId = Symbol(); // 使用Symbol作为唯一的客户端标识
        clients.set(clientId, res);

        const content = 'server connect success'
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
        req.on('close', () => {
          // 连接关闭时，从列表中移除客户端
          clients.delete(clientId);
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
    server.listen(7080, () => {
      console.log('Server running on port 7080');
    });

    // 将响应列表挂到eggapp上
    this.sseClient = clients
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  /**
   * core app have been loaded
   */
  async ready() {
    // do some things
  }

  /**
   * electron app ready
   */
  async electronAppReady() {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady() {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    if (winOpt.show == false) {
      const win = this.electron.mainWindow;
      win.once('ready-to-show', () => {
        win.show();
        win.focus();
      })
    }
  }

  /**
   * before app close
   */
  async beforeClose() {
    // do some things

  }

  publishToTopic(topic, message) {
    this.server.publish(topic, message, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error('Error publishing message:', error);
      } else {
        console.log('Message published successfully.');
      }
    });
  };
}

Index.toString = () => '[class Index]';
module.exports = Index;