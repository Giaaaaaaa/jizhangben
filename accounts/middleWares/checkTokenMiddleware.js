const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')



module.exports = (req, res, next)=>{
    const token = req.get('token')
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        })
    }

    jwt.verify(token, `${secret}`, (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'jiao yan shi bai',
                data: null
            })
        }
        req.u = data

    })
    next()
}