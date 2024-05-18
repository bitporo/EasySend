const { Service } = require('ee-core');
const Log = require('ee-core/log');
const os = require('os');

class SystemService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async getIps() {
    const networkInterfaces = os.networkInterfaces()
    console.log(networkInterfaces)
    return Object.keys(networkInterfaces).map(item => {
      return networkInterfaces[item][1].address
    })
  }
}

SystemService.toString = () => '[class SystemService]';
module.exports = SystemService;