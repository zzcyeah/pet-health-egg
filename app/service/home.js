'use strict';

const Service = require('egg').Service;

/**
 * Service
 * @class
 * @author zzcyes
 */
class HomeService extends Service {
    /**
     * 新增商品
     * @param {object} params - 条件
     * @return {string} - 商品uuid
     */
    async getId(params = {}) {
        let { id } = params;
        // const { app } = this;
        console.warn(params);
        if (id < 10) return 'error'
        // const crateInfo = app.getCrateInfo(userUuid, userName);
        id++;

        if (id >= 21) return '生日快乐!'
        // goods = { ...goods, ...crateInfo, orgUuid };
        return id;

        // return await app.model.Goods.saveNew(goods);
    }

}

module.exports = HomeService;
