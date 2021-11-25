var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
var shortid = require('shortid');
var db = require('../mod/db.js');
const bcrypt = require('bcrypt');


module.exports = function (passport) {
    router.post('/join', function (req, res) {
        var post = req.body;
        var name = post.name;
        var nick = post.nickname;
        if (db.get('users').find({
            nickname: nick
        }).value()) {
            res.send(`<script>alert('닉네임 중복! 다시 만들어주세요');window.history.back();</script>`)
            return;
        }
        var id = post.id;
        if (db.get('users').find({
            id: id
        }).value()) {
            res.send(`<script>alert('아이디 중복! 다시 만들어주세요');window.history.back();</script>`)
            return;
        }


        var pw = post.pw;
        if(post.email2==="직접 입력")
        var email = post.email1+'@'+post.email3;
        else var email=post.email1+'@'+post.email2;
        var quest = post.quest;
        if (post.direct)
            quest = post.direct;
        if (!post.ans)
            post.ans = '';
        var ans = post.ans;
        var year = post.year;
        if (post.month === '월')
            post.month = '';
        var month = post.month;
        var day = post.day;
        if (day < 10 && day[0] != '0' && day != '') day = '0' + day;
        // var joinday,visit,post,comment;

        bcrypt.hash(pw, 10, function (err, hash) {
            var userinf = {
                key: shortid.generate(),
                name: name,
                nickname: nick,
                id: id,
                password: hash,  //pw 대신 암호화한 hash
                email:email,
                question: quest,
                answer: ans,
                year: year,
                month: month,
                day: day,
                write:0,
                comment:0
            }
            db.get('users').push(userinf).write();

            req.login(userinf, function (err) {
                req.session.save(function () {
                    res.redirect('/');
                });
            })
        });

    })

    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/home/login',
            failureFlash: true
        })
    );

    router.get('/logout', function (req, res) {
        req.logout();
        req.session.save(function () {
            res.redirect('/home/login');
        })
    });
 
    return router;
}