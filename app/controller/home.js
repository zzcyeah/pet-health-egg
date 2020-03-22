'use strict';

const Controller = require('../core/base_controller');

// 定义创建接口的请求参数规则
const createRule = {
    id: 'number',
};

class HomeController extends Controller {
    async info() {
        const { ctx } = this;

        const rule = {
            id: 'string',
        };
        // console.warn(ctx);

        ctx.validate(rule);

        const uuid = await ctx.service.home.getId(ctx.request.body);

        this.success(uuid);
    }
}

module.exports = HomeController;
