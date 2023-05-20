const express = require('express')
const router = express.Router()
const moment = require('moment')
const MyAccountModel = require('../../models/MyAccountModel')
const checkLoginMiddleware = require('../../middleWares/checkLoginMiddleware')



router.get('/', checkLoginMiddleware,(req, res) => {
    MyAccountModel.find().sort({time: -1})
    .then(data=>res.render('list',{accounts:data}))
    .catch(err=>res.status(500).send('出错啦'))
    // .exec((err,data)=>{
    //     if (err) {
    //       res.status(500).send('duqushibai')
    //       return
    //     }
    //     res.render('list',{accounts:data, moment})
    //   })
    // res.render('list', {})
})

router.get('/form', checkLoginMiddleware,(req, res) => {
    res.render('form')
})


router.post('/',  checkLoginMiddleware,(req, res) => {
    MyAccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    })
        .then((data) => { console.log(data); res.render('success') })
        .catch((err) => { res.render('fail') })
    // res.render('success')
})

router.get('/:id',  checkLoginMiddleware,(req, res) => {
    const { id } = req.params
    MyAccountModel.deleteOne({ _id: id })
        .then((data) => { console.log(data); res.render('success') })
        .catch((err) => { res.render('fail') })
})

module.exports = router