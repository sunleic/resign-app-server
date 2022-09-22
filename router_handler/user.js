// 加密组件
const bcrypt = require('bcryptjs');
// 数据库
const db = require('../db/index');
// 生产token组件
const jwt = require('jsonwebtoken');
// 全局token配置文件
const config = require('../config');

exports.register = (req, res) => {
    const userinfo = req.body;
    console.log('注册请求的参数：'+ JSON.stringify(userinfo));
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或者密码不能为空！');

    const sqlStr = 'select * from users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该用户名已存在，请更换其他用户名进行注册');

        userinfo.password = bcrypt.hashSync(userinfo.password, 10);

        const insertSql = 'insert into users set ?'
        db.query(insertSql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows != 1) return res.cc('用户注册失败，请稍后再试');

            return res.cc('注册成功', {}, 0);
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body;
    const sql = 'select * from users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！');

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) return res.cc('登录失败');

        const user = {...results[0], password: '', avatar: ''};
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});

        res.cc('登陆成功！', {token: 'Bearer ' + tokenStr}, 0);
    })
}

exports.userinfo = (req, res) => {
    const params = req.params;
    const sqlStr = 'select * from users where username=?';
    db.query(sqlStr, req.params.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !==1) return res.cc('查询失败！')

        const params = req.params;
        const resObject = {...results[0]}
        resObject.remove('password');
        return res.cc('success', resObject, 0);
    }); 
}