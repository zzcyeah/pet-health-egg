"use strict";

const Service = require("egg").Service;

/**
 * Service
 * @class
 * @author zzcyes
 */

class UserSevice extends Service {
  /**
   * 根据id获取用户地址
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */

  // let sid = mongoose.Types.ObjectId(id);
  async getUserByName(params = {}) {
    let { userName } = params;
    return await this.ctx.model.User.findOne({ userName });
  }
}

module.exports = UserSevice;
