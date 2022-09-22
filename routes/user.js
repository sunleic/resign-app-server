var express = require('express');
var router = express.Router();
const userHandler = require('../router_handler/user')
// 用于自动验证表单数据
const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')

router.post('/register', expressJoi(reg_login_schema), userHandler.register)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
router.get('/:username', userHandler.userinfo)

module.exports = router;
