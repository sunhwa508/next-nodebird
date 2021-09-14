const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next)=>{ //POST /user/login
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.errer(err);
            next(err); //express가 에러를 처리할 수 있게 보내버린다.
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr)
                return next(loginErr);
            }
            return res.json(user);
        });
    })(req,res,next);
})

router.post('/', async (req, res, next)=>{ //POST /user/
    try{
        //이메일 중복체크
        const exUser = await User.findOne({
            where:{
                email: req.body.email,
            }
        })
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname:req.body.nickname,
            password: hashedPassword,
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send('ok');
    }catch(error){
        console.error(error);
        next(error) //status 500
    }
});

module.exports = router;