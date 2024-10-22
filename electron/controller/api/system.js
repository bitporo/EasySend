'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const os = require('os');
const Ps = require('ee-core/ps');
const {
  shell
} = require('electron');
class SystemController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.app = ctx
  }
  async getHostIp() {
    const result = await Services.get('system').getIps();
    return result;
  }

  getMyIp() {
    return {
      ip: this.app.request.ip
    };
  }
  getUploadPath() {
    return {
      old: os.tmpdir(),
      now: Ps.getExecDir() + '/uplodFiles',
    };
  }

  getPlatform() {
    return {
      platform: os.type()
    };
  }

  /**
 * 打开目录
 */
  openDirectory(args) {
    if (!args.path) {
      return false;
    }

    shell.openPath(args.path);
    return true;
  }
}

SystemController.toString = () => '[class SystemController]';
module.exports = SystemController;