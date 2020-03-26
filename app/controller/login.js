const Controller = require('../core/base_controller');

class LoginController extends Controller {
    /**
     * 获取用户列表
     */
    async login() {
        const { ctx } = this;
        console.warn(ctx.request);
        const userInfo = await ctx.service.login.login(ctx.request.body);
        const { data, status } = userInfo;

        if (status === 1) {
            this.success({ token: data });
        } else {
            this.fail(ctx.ERROR_CODE, data);
        }
    }
}

module.exports = LoginController;
