'use strict';

module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败

  // 获取token
  async getToken(userName) {
    const { app } = this;
    const token = await app.redis.get(userName);
    return token;
  },

  // 销毁token
  async destroyToken(userName) {
    const { app } = this;
    await app.redis.del(userName);
  },

  // 设置token
  async setToken(userName) {
    const { app } = this;

    const token = app.jwt.sign({ userName }, app.config.jwt.secret, {
      expiresIn: '1h'
    });

    await app.redis.set(userName, token);

    return token;
  },

  // 校验token
  async verifyToken(token, userName) {
    const { app } = this;
    const vToken = await this.getToken(userName);
    if (!token || !vToken) {
      this.verifyFail(100, '尚未登录');
      return false;
    }
    if (token !== vToken) {
      this.verifyFail(100, '请重新登录');
      return false;
    }

    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          resolve({ verify: false, message: err.message });
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });

    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }

    return true;
  },

  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message };
    this.status = code;
  }
};
