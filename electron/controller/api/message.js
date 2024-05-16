'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
/**
 * example
 * @class
 */
class MessageController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.app = ctx
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async getMessageList() {
    const result = await Services.get('jsondb').getMessageList();
    return result;
  }

  async addMessageData(args) {
    const result = await Services.get('jsondb').addMessageData(args.data);
    return result;
  }

  async uploadFile(args) {
    const result = await Services.get('uploadFile').saveFile(args.file);
    return result;
  }

  async downLoadFile(args) {
    // 设置响应头，指定内容类型为application/octet-stream，并且设置Content-Disposition以提示浏览器进行文件下载
    this.app.response.set({ 'content-type': 'application/octet-stream'});
    const result = await Services.get('uploadFile').getFile(args.query);
    return result;
  }
}


MessageController.toString = () => '[class ExampleController]';
module.exports = MessageController;  