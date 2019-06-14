const assert = require('assert');

const User = require('../models/user');
// const Group = require('../models/group');

module.exports = {
  async register(ctx) {
    const {
      username, password, os, browser, environment,
    } = ctx.data;
    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

    const user = await User.findOne({ username });
    assert(!user, '该用户名已存在');

    console.log('模拟用户注册校验通过');
  }
};
