"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(
    {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      age: {
        type: Number
      },
      sex: {
        type: String
      },
      lastTime: {
        type: Number
      },
      userName: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      createdTime: {
        type: Date,
        defalut: Date.now
      },
      role: {
        type: Number,
        default: 0 // 0： 普通用户，1，管理员
      }
    },
    { versionKey: false }
  );

  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const User = mongoose.model("Users", UserSchema);

  // init方法放到这里
  initUserData(User);

  return User;
};

/**
 * 初始化一个测试用户
 * @param {Object} User
 */
function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log("init user failed");
    } else if (!doc.length) {
      new User({
        id: 1,
        name: "zzcyes",
        age: 24,
        sex: "男",
        userName: "admin",
        password: "admin",
        createdTime: Date.now()
      }).save();
    } else {
      console.log("-------------init user successfully--------------");
    }
  });
}
