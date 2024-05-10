'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const os = require('os')

/**
 * example
 * @class
 */
class MessageController extends Controller {

  constructor(ctx) {
    super(ctx);
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async getMessageList () {
    const result = await Services.get('jsondb').getMessageList();
    return result;
  }

  async addMessageData (args) {
    const result = await Services.get('jsondb').addMessageData(args.data);
    return result;
  }
}


MessageController.toString = () => '[class ExampleController]';
module.exports = MessageController;  