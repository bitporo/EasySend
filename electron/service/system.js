const { Service } = require('ee-core');
const Log = require('ee-core/log');
const os = require('os');

class SystemService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async getIps() {
    const networkInterfaces = os.networkInterfaces()
    // 获取网卡name，遍历网卡名字获取每个显卡ip数字，找到ip4地址返回
    return Object.keys(networkInterfaces).map(item => networkInterfaces[item].find(ipItem => ipItem.family == 'IPv4')?.address).filter(item=>item)
  }
}

SystemService.toString = () => '[class SystemService]';
module.exports = SystemService;