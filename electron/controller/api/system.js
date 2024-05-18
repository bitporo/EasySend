'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

class SystemController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async getHostIp() {
    const result = await Services.get('system').getIps();
    return result;
  }
}

SystemController.toString = () => '[class SystemController]';
module.exports = SystemController;