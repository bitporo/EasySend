'use strict';

const { Service } = require('ee-core');
const Log = require('ee-core/log');
const fs = require('fs');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const Ps = require('ee-core/ps');
/**
 * json数据存储
 * @class
 */
class JsondbService extends Service {

  constructor(ctx) {
    super(ctx);

    let jsondbOptions = {
      driver: 'jsondb'
    }
    // jsondb数据库
    this.jsonFile = 'jsondb';
    this.jsonDB = Storage.connection(this.jsonFile, jsondbOptions);
  }

  /*
   * 增加消息
   */
  async addMessageData(obj) {
    const key = 'message';
    if (!this.jsonDB.db.has(key).value()) {
      this.jsonDB.db.set(key, []).write();
    }
    const id = crypto.randomBytes(16).toString('hex')
    this.jsonDB.db
      .get(key)
      .push({ id, ...obj })
      .write();

    this.app.sseClient.forEach(clientRes => {
      if (clientRes.writable) {
        const content = 'Can refresh'
        clientRes.write(`data: ${JSON.stringify({ content })}\n\n`);
      } else {
        // 如果客户端连接不可写，则从列表中移除
        this.app.sseClient.delete(clientRes);
      }
    });
    return {
      code: 200,
      message: '添加消息成功！'
    };
  }

  /*
   * 删除消息
   */
  async deleteMessages(objArray) {
    const key = 'message';
    objArray.forEach(async obj => {
      this.jsonDB.db
        .get(key)
        .remove({ id: obj.id })
        .write();
      if (obj.type == 'file') {
        fs.unlink(Ps.getExecDir() + '/uplodFiles/' + obj.fileData.newFilename, (err) => {
          if (err) {
            console.error(`删除文件失败: ${err}`);
          }
        })
      }
    })
    this.app.sseClient.forEach(clientRes => {
      if (clientRes.writable) {
        const content = 'Can refresh'
        clientRes.write(`data: ${JSON.stringify({ content })}\n\n`);
      } else {
        // 如果客户端连接不可写，则从列表中移除
        this.app.sseClient.delete(clientRes);
      }
    });
    return {
      code: 200,
      message: '删除消息成功！'
    }
  }

  /*
   * 改 Test data
   */
  // async updateTestData(name = '', age = 0) {
  //   const key = this.jsonDBKey.test_data;
  //   const data = this.jsonDB.db
  //     .get(key)
  //     .find({ name: name }) // 修改找到的第一个数据，貌似无法批量修改 todo
  //     .assign({ age: age })
  //     .write();

  //   return data;
  // }

  /*
   * 获取消息列表
   */
  async getMessageList() {
    let data = this.jsonDB.db
      .get('message')
      //.find({age: age}) 查找单个
      // .filter(function(o) {
      //   let isHas = true;
      //   isHas = age === o.age ? true : false;
      //   return isHas;
      // })
      //.orderBy(['age'], ['name']) 排序
      //.slice(0, 10) 分页
      .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  /*
   * all Test data
   */
  // async getAllTestData() {
  //   const key = this.jsonDBKey.test_data;
  //   if (!this.jsonDB.db.has(key).value()) {
  //     this.jsonDB.db.set(key, []).write();
  //   }
  //   let data = this.jsonDB.db
  //     .get(key)
  //     .value();

  //   if (_.isEmpty(data)) {
  //     data = []
  //   }

  //   return data;
  // }

  /*
   * get data dir (sqlite)
   */
  async getDataDir() {
    const dir = this.jsonDB.getStorageDir();

    return dir;
  }

  /*
   * set custom data dir (sqlite)
   */
  async setCustomDataDir(dir) {
    if (_.isEmpty(dir)) {
      return;
    }

    // the absolute path of the db file
    const dbFile = path.join(dir, this.jsonFile);
    this.jsonDB = Storage.connection(dbFile);

    return;
  }
}

JsondbService.toString = () => '[class JsondbService]';
module.exports = JsondbService;
