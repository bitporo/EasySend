const { Service } = require('ee-core');
const fs = require('fs');
const os = require('os');
const Log = require('ee-core/log');
const Ps = require('ee-core/ps');
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
    return fs.createReadStream(Ps.getExecDir() + '/uplodFiles/' + query.fileName);
  }
}

UploadFileService.toString = () => '[class UploadFileService]';
module.exports = UploadFileService;