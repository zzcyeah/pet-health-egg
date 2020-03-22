'use strict';

const Service = require('egg').Service;

/**
 * Service
 * @class
 * @author zzcyes
 */

class LoginSevice extends Service {
  /**
   * 根据id获取用户地址
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */

  // let sid = mongoose.Types.ObjectId(id);
  async login(params = {}) {
    const { ctx } = this;
    console.warn('params', params);
    let { userName, password } = params;

    const userInfo = await ctx.model.User.findOne({ userName });

    if (userName === userInfo.userName && password === userInfo.password) {
      return ctx.setToken(userName);
    } else {
      return null;
    }
  }
}

module.exports = LoginSevice;
