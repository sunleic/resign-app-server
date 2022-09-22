// 用于自定表单验证规则
const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}