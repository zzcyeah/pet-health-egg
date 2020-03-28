'use strict';

const Service = require('egg').Service;

/**
 * Service
 * @class
 * @author zzcyes
 */

class RegisterSevice extends Service {
    /**
     * 根据id获取用户地址
     * @param {object} params - 条件
     * @return {object|null} - 查找结果
     */

    // let sid = mongoose.Types.ObjectId(id);
    async register(params = {}) {
        const { ctx } = this;
        const { userName, password } = params;
        console.log({ userName });
        const userInfo = await ctx.model.User.findOne({ userName });

        if (!userInfo) {
            await ctx.model.User.create({
                userName,
                password,
                createdTime: Date.now()
                // id: 1,
                // name: "zzcyes",
                // age: 24,
                // sex: "男",
                // userName: "admin",
                // password: "admin",
                // createdTime: Date.now()
            });
            return true;
        } else {
            return false;
        }
    }
}

module.exports = RegisterSevice;
