const { Service } = require('ee-core');
const fs = require('fs');
const os = require('os');
const Log = require('ee-core/log');
const Ps = require('ee-core/ps');
const fileHomeDir = os.type() == 'Windows_NT' ? Ps.getExecDir() + '/uplodFiles' : os.tmpdir()
class UploadFileService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async saveFile(file) {
    const { filepath, newFilename, originalFilename, mimetype, size } = file
    return {
      code: 200,
      data: {
        filepath,
        newFilename,
        originalFilename,
        mimetype,
        size,
      },
      message: '文件上传成功！'
    };
  }

  async getFile(query) {
    // 通过fs.createReadStream创建一个可读流来读取文件
    const promise = new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(fileHomeDir + '/' + query.fileName);
      readStream.on('ready', () => {
        // 当流准备就绪时可以执行一些操作
        resolve(readStream)
      });
      // 监听 'error' 事件来捕获任何可能发生的错误
      readStream.on('error', (err) => {
        reject(err)
      });
    })
    return promise
  }
}

UploadFileService.toString = () => '[class UploadFileService]';
module.exports = UploadFileService;