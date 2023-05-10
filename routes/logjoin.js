const jwt = require('jsonwebtoken')
const secretkey = 'nodeprac'
const Member = require('../schemas/member')
const auth = require('../middleware/auth')
const express = require('express')
const router =  express.Router()

router.post('/join', async (req,res) => {
    const pwCheck_reg = RegExp(/^.{4,16}$/);
    const nickCheck_reg = RegExp(/^[a-z|A-Z|0-9]{3,16}$/);
    try {
        const {user,password,passwordCheck} = req.body
        if(password!=passwordCheck) {
            res.status(412).json({'msg':'패스워드가 일치하지 않습니다'})
        }

        if(!(nickCheck_reg.test(user))) {
            res.status(412).json({'msg' : '닉네임 형식이 올바르지 않습니다'})
        }

        if(!(pwCheck_reg.test(password))) {
            res.status(412).json({'msg' : '패스워드 형식이 올바르지 않습니다'})
        }

        const nickCheck = await Member.findOne({user:user})
        console.log(nickCheck)
        if(nickCheck) {
            res.status(412).json({'msg':'중복된 닉네임 입니다'})
        } else {
            Member.create({user,password}).catch(()=>res.status(500).json({'msg':'db접속불량'}))
            res.status(201).json({'msg':'회원가입이 완료됐습니다'})    
        }
        
        
    } catch(e) {
            res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    } 
})


router.post('/login', async (req,res) => {
    try {
    const {user,password} = req.body
    const login = await Member.find({
        user:user,
        password:password
    })
    if(login) {
        const userjwt = jwt.sign({user:user},secretkey,{expireIn:"1h"})
        res.cookie('auth',`Bearer ${userjwt}`)
        res.status(200).json({'msg':'토큰발행'})
    } else {
        res.status(412).json({'msg':'닉네임 혹은 비밀번호 일치하지 않습니다'})
    }
} catch(e) {
    res.status(400).json({'msg':'잘못된 접근입니다'})
}
    
})

module.exports = router