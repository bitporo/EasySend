const { Application } = require('ee-core');
const { app, Menu, session } = require('electron')
const http = require('http');

class Index extends Application {

  constructor() {
    super();
    // this === eeApp;
    const template = [
      {
        label: '操作',
        submenu: [
          { label: '复制', accelerator: 'CmdorCtrl+C', role: 'copy' },
          { label: '粘贴', accelerator: 'CmdorCtrl+V', role: 'paste' },
          { label: '刷新', accelerator: 'CmdorCtrl+R', role: 'reload' },
        ]
      },
    ]
    // 设置顶部菜单
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    const clients = new Map(); // 用来存储所有连接的客户端
    const server = http.createServer((req, res) => {
      if (req.url === '/sse') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*'
        });

        // 将新连接的客户端添加到列表
        const clientId = Symbol(); // 使用Symbol作为唯一的客户端标识
        clients.set(clientId, res);

        const content = 'server connect success'
        // sse 必须按照这个格式发送
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

  }

  /**
   * main window have been loaded
   */
  async windowReady() {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    const win = this.electron.mainWindow;
    if (winOpt.show == false) {
      win.once('ready-to-show', () => {
        win.show();
        win.focus();
      })
    }
    // do some things
    session.defaultSession.on('will-download', (downloadevent, item, webContents) => {
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            const progress = (item.getReceivedBytes() / item.getTotalBytes()).toFixed(2)
            webContents.send('progress', progress)
            win.setProgressBar(parseFloat(progress))
          }
        }
      })
      item.once('done', (event, state) => {
        win.setProgressBar(-1)
        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }

  /**
   * before app close
   */
  async beforeClose() {
    // do some things

  }
}

Index.toString = () => '[class Index]';
module.exports = Index;