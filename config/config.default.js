/* eslint valid-jsdoc: "off" */

'use strict';

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
      port: 7001,
      hostname: '192.168.0.105'
    }
  };
  // config.gzip = {
  //     threshold: 1024, // 小于 1k 的响应体不压缩
  // };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/egg-mongo',
      options: {}
    }
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
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

  config.baseUrl = 'http://127.0.0.1:7001';

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
