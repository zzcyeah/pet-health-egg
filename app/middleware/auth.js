'use strict';

/**
 * 判断是否登录
 * @param {object} options - 中间件的配置项
 * @param {Egg.Application} app - 当前应用的实例
 * @author ruiyong-lee
 * @return {null} null
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    // 过滤登录接口和验证token
    const ignorePaths = ['/login', '/register'];
    const { userName } = ctx.request.body;
    const token = ctx.header.authorization;
    const valid = await ctx.verifyToken(token, userName);
    if (valid || ignorePaths.includes(ctx.path)) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        code: ctx.NO_LOGIN_CODE,
        message: '尚未登录'
      };
    }
  };
};
