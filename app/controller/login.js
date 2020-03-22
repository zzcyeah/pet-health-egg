const Controller = require('../core/base_controller');

class LoginController extends Controller {
  /**
   * 获取用户列表
   */
  async login() {
    const { ctx } = this;
    console.warn(ctx.request);
    const userInfo = await ctx.service.login.login(ctx.request.body);

    if (userInfo) {
      this.success(userInfo);
    } else {
      this.fail(ctx.ERROR_CODE, '用户名或密码错误');
    }
  }
}

module.exports = LoginController;
