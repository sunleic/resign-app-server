// 加密组件
const bcrypt = require('bcryptjs');
// 数据库
const db = require('../db/index');
// 生产token组件
const jwt = require('jsonwebtoken');
// 全局token配置文件
const config = require('../config');

exports.register = (req, res) => {
    const params = req.body;
    console.log('注册请求的参数：'+ JSON.stringify(params));
    if (!params.username || !params.password) return res.cc('用户名或者密码不能为空！');

    const sqlStr = 'select * from users where username=?';
    db.query(sqlStr, params.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该用户名已存在，请更换其他用户名进行注册');

        params.password = bcrypt.hashSync(params.password, 10);

        const insertSql = 'insert into users set ?'
        db.query(insertSql, {username: params.username, password: params.password}, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows != 1) return res.cc('用户注册失败，请稍后再试');

            return res.cc('注册成功', {}, 0);
        })
    })
}

exports.login = (req, res) => {
    const params = req.body;
    // console.log('~~~~~~~~~~~用户信息查询---参数：' + JSON.stringify(params));
    const sql = 'select * from users where username=?';
    db.query(sql, params.username, (err, results) => {
        // console.log('查询结果：----- '+ JSON.stringify(results));
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！');

        const compareResult = bcrypt.compareSync(params.password, results[0].password);
        if (!compareResult) return res.cc('登录失败');

        const user = {...results[0], password: '', avatar: ''};
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});

        return res.cc('登陆成功！', {token: 'Bearer ' + tokenStr}, 0);
    })
}

exports.userinfo = (req, res) => {
    const params = req.params;
    console.log('用户信息查询---参数：' + JSON.stringify(params));
    const sqlStr = 'SELECT * FROM userinfo WHERE userid = ?';
    db.query(sqlStr, params.userid, (err, results) => {
        console.log('用户信息查询---结果：----- '+ JSON.stringify(results));
        if (err) return res.cc(err);
        if (results.length !==1) return res.cc('查询失败！');

        const resObject = {...results[0], 
            tags: [
            {
              key: '0',
              label: '很有想法的',
            },
            {
              key: '1',
              label: '专注设计',
            },
            {
              key: '2',
              label: '辣~',
            },
            {
              key: '3',
              label: '大长腿',
            },
            {
              key: '4',
              label: '川妹子',
            },
            {
              key: '5',
              label: '海纳百川',
            },
            ],
            geographic: {
                province: {
                    label: '浙江省',
                    key: '330000',
                },
                city: {
                    label: '杭州市',
                    key: '330100',
                },
            }
        }
        delete resObject.geographicid;
        delete resObject.tagsid;

        return res.cc('请求成功', resObject, 0);
    }); 
}