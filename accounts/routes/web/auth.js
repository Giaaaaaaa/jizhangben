const express = require('express')
const UserModel = require('../../models/UserModel')
const md5 = require('md5')


const router = express.Router()


router.get('/reg',(req, res)=>{
    res.render('auth/reg')
})

router.post('/reg',(req, res)=>{
    console.log(req.body)
    UserModel.create({...req.body, password: md5(req.body.password)})
    .then(data=>res.render('success',{msg:'欢迎注册', url:'/login'}))
    .catch(err=>res.send('shibai'))
})

router.get('/login',(req, res)=>{
    res.render('auth/login')
})

router.post('/login',(req, res)=>{
    const {username, password} =req.body
    UserModel.findOne ({username, password: md5(password)})
    .then(data=>{
        if(!data){
            return res.send('wrong')
        }
        
        req.session.username = data.username
        req.session._id = data._id
        res.render('success', {msg:'welcome', url:'/accounts'})
        // data? res.render('success', {msg:'welcome', url:'/accounts'}): res.send('wrong')
    })
    .catch(err=>res.send('denglushibai'))
})

router.post('/logout',(req, res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})

module.exports = router