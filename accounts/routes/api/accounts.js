const express = require('express')
const router = express.Router()
const moment = require('moment')
const MyAccountModel = require('../../models/MyAccountModel')
const jwt = require('jsonwebtoken')
const checkTokenMiddleware = require('../../middleWares/checkTokenMiddleware')

// const checkTokenMiddleware = (req, res, next)=>{
//     const token = req.get('token')
//     if (!token) {
//         return res.json({
//             code: '2003',
//             msg: 'token 缺失',
//             data: null
//         })
//     }

//     jwt.verify(token, 'jiami', (err, data) => {
//         if (err) {
//             return res.json({
//                 code: '2004',
//                 msg: 'jiao yan shi bai',
//                 data: null
//             })
//         }

//     })
//     next()
// }

router.get('/', checkTokenMiddleware,(req, res) => {
    
console.log(req.u);
    MyAccountModel.find().sort({ time: -1 })
        //.then(data=>res.render('list',{accounts:data}))
        // .catch(err=>res.status(500).send('出错啦'))
        .then(data => {
            res.json({
                code: "0000",
                msg: "读取成功",
                data
            })
        })
        .catch(err => {
            res.json({
                code: "1001",
                msg: "读取失败",
                data: null
            })
        })

})

//接口服务中不会返回html
// router.get('/form', (req, res) => {
//     res.render('form')
// })


router.post('/',checkTokenMiddleware, (req, res) => {
    MyAccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    })
        .then((data) => { res.json({ code: "0000", msg: "添加成功", data }) })
        .catch((err) => { res.json({ code: "1002", msg: "添加失败", data: null }) })
    // res.render('success')
})

router.delete('/:id',checkTokenMiddleware, (req, res) => {
    const { id } = req.params
    MyAccountModel.deleteOne({ _id: id })
        .then((data) => { res.json({ code: "0000", msg: "删除成功", data: {} }) })
        .catch((err) => { res.json({ code: "1003", msg: "删除失败", data: null }) })
})

router.get('/:id',checkTokenMiddleware, (req, res) => {
    const { id } = req.params
    MyAccountModel.findById({ _id: id })
        .then((data) => { res.json({ code: "0000", msg: "获取成功", data }) })
        .catch((err) => { res.json({ code: "1004", msg: "获取失败", data: null }) })
})

router.patch('/:id',checkTokenMiddleware, (req, res) => {
    const { id } = req.params
    // MyAccountModel.updateOne({ _id: id },req.body)
    //     .then((data)=>{
    //         const myData = MyAccountModel.findById({_id:id})
    //         res.json({code:"0000",msg:"更新成功",data: myData}) 
    //     })
    //     .catch((err) => { res.json({code:"1005",msg:"更新失败",data:null}) })
    MyAccountModel.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            res.json({ code: "1005", msg: "更新失败", data: null })
            return
        }
        MyAccountModel.findById({ _id: id })
            .then((data) => { res.json({ code: "0000", msg: "更新成功", data }) })
            .catch((err) => { res.json({ code: "1004", msg: "获取失败", data: null }) })
    })
})

module.exports = router