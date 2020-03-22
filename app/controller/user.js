const Controller = require("../core/base_controller");

class UserController extends Controller {
  /**
   * 获取用户列表
   */
  async getUserList() {
    const { ctx } = this;

    const rule = {
      userName: "string"
    };

    ctx.validate(rule);

    const users = await ctx.service.user.getUserByName(ctx.request.body);

    this.success(users);
  }
}

module.exports = UserController;
