'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const os = require('os');
const Ps = require('ee-core/ps');
class SystemController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.app = ctx
  }
  async getHostIp() {
    const result = await Services.get('system').getIps();
    return result;
  }

  async getMyIp() {
    return {
      ip: this.app.request.ip
    };
  }
  async getUploadPath() {
    return {
      old: os.tmpdir(),
      now: Ps.getExecDir() + '/uplodFiles',
    };
  }

  async getPlatform() {
    return {
      platform: os.type()
    };
  }
}

SystemController.toString = () => '[class SystemController]';
module.exports = SystemController;