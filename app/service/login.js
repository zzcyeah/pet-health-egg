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

        if (!userInfo) {
            return {
                data: '用户未注册',
                status: 0
            };
        }

        if (userName === userInfo.userName && password === userInfo.password) {
            const token = await ctx.setToken(userName);
            return {
                data: token,
                status: 1
            };
        }

        return {
            data: '用户名或密码错误',
            status: 0
        };

    }


}

module.exports = LoginSevice;
