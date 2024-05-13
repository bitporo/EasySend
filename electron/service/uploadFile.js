const { Service } = require('ee-core');
const fs = require('fs');
const Log = require('ee-core/log');
const os = require('os')
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
}

UploadFileService.toString = () => '[class UploadFileService]';
module.exports = UploadFileService;