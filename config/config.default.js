/* eslint valid-jsdoc: "off" */

'use strict';


const DEFALUTE_HOST_NAME = '127.0.0.1'
const DEFALUTE_PORT = 7001;

const MONGODB_HOST_NAME = '193.112.216.95'
const MONGODB_PORT = 27017;

const REAIS_HOST_NAME = '193.112.216.95'
const REAIS_PORT = 6379;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1579426649131_9323';

    // 全局中间件
    config.middleware = [];
    config.middleware = ['auth'];

    config.cluster = {
        listen: {
            path: '',
            port: DEFALUTE_PORT,
            hostname: DEFALUTE_HOST_NAME
        }
    };
    // config.gzip = {
    //     threshold: 1024, // 小于 1k 的响应体不压缩
    // };

    config.mongoose = {
        client: {
            url: `mongodb://${MONGODB_HOST_NAME}:${MONGODB_PORT}/egg-mongo`,
            options: {}
        }
    };

    config.redis = {
        client: {
            port: REAIS_PORT,
            host: REAIS_HOST_NAME,
            password: 'auth',
            db: 0
        }
    };

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['http://127.0.0.1:5500']
    };

    config.baseUrl = `http://${DEFALUTE_HOST_NAME}:${DEFALUTE_PORT}`;

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.jwt = {
        secret: '123456'
    };

    const userConfig = {
        myAppName: 'pet health management system'
    };

    return {
        ...config,
        ...userConfig
    };
};
