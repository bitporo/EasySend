'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

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
}

SystemController.toString = () => '[class SystemController]';
module.exports = SystemController;