const Controller = require('../core/base_controller');

class RegisterController extends Controller {
  /**
   * 获取用户列表
   */
  async register() {
    const { ctx } = this;

    const isSucceed = await ctx.service.register.register(ctx.request.body);
    if (isSucceed) {
      this.success('注册成功!');
    } else {
      this.fail(ctx.ERROR_CODE, '账号已存在');
    }
  }
}

module.exports = RegisterController;
