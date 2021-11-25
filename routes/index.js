var express = require('express');
const db = require('../mod/db.js');
var router = express.Router();
var mod = require('../mod/mod.js');
var mod2 = require('../mod/mod2.js');
var dup = require('../mod/dupli.js');
var bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', function (req, res) {
    console.log(req.session.passport)
    if (!req.user) {
        res.redirect('/home/login');
        return;
    }
    var body = mod2.mainpg(req.user.nickname, req.user.id);
    var html = mod.HTML('메인페이지', '', body);
    res.send(html);
});

router.get('/:userid/userinfo', function (req, res) {
    var user = db.get('users').find({
        id: req.params.userid
    }).value(); 
    var post = req.user;
    if (!user) {
        res.send("<script>alert('페이지가 존재하지 않습니다!');location.href='/';</script>");
        return;
    }
    if (!post) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    if(post.key != user.key){
        var body=mod2.openinfo(user.name,user.nickname,user.id,user.email,
            user.year,user.month,user.day);
        var html=mod.HTML(`${user.nickname}님의 회원정보`,'userinfo',body);
        res.send(html);
        return;
    }

    var body = mod2.userinfo(post.nickname, post.name, post.nickname, post.id,
        post.email, post.question, post.year, post.month, post.day);
    var html = mod.HTML(`${post.nickname}님의 회원정보`, 'userinfo', body);
    res.send(html);
})
router.post('/:userid/userinfo', function (req, res) {
    if (!req.user) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post = req.body;
    var user = db.get('users').find({
        id: req.params.userid,
    }).value();
    if (req.user.key != user.key) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    bcrypt.compare(post.pw, user.password, function (err, result) {
        var body = mod2.userinfo(user.nickname, user.name, user.nickname, user.id,
            user.email, user.question, user.year, user.month, user.day);
        var html = mod.HTML(`${user.nickname}님의 회원정보`, 'userinfo', body);
        if (!result) { //비번오류
            res.send(html + `<script>alert('비밀번호가 일치하지 않습니다!');clickmodify();</script>`)
            return;
        }
        res.send(html + `<script>Modify('${user.answer}',1)</script>`)
    });
})
router.post('/:userid/userinfo/modify', function (req, res) {
    if (!req.user) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post = req.body;
    var user = db.get('users').find({
        id: req.params.userid,
    }).value();
    if (req.user.key != user.key) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    if (post.month != '' && post.month < 10 && post.month[0] != '0')
        post.month = '0' + post.month;
    if (post.day != '' && post.day < 10 && post.day[0] != '0')
        post.day = '0' + post.day;
    db.get('users').find({
        id: post.id
    }).assign({
        name: post.name,
        nickname: post.nickname,
        email: post.email,
        question: post.quest,
        answer: post.ans,
        year: post.year,
        month: post.month,
        day: post.day
    }).write();
    res.redirect(`/${post.id}/userinfo`);
})
router.post('/:userid/userinfo_', function (req, res) {
    res.send(dup.dupli_mod(req, req.user.nickname));
})
router.post('/:userid/pwchange', function (req, res) {
    if (!req.user) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post = req.body;
    var user = db.get('users').find({
        id: req.params.userid,
    }).value();
    if (req.user.key != user.key) {
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    bcrypt.compare(post.current, user.password, function (err, result) {
        if (!result) {//비밀번호 틀림, 돌아갔을 때 비밀번호 변경 ui 보이게끔
            var own = req.user
            var body = mod2.userinfo(own.nickname, own.name, own.nickname, own.id,
                own.email, own.question, own.year, own.month, own.day);
            body = body + `<script>clickbtn('#pwinf','${own.id}');
            alert('현재 비밀번호가 일치하지 않습니다!')</script>`;
            var html = mod.HTML(`${post.nickname}님의 회원정보`, 'userinfo', body);
            res.send(html);
            return;
        }
        bcrypt.hash(post.newer, 10, function (err, hash) {
            db.get('users').find({
                id: post.id,
            }).assign({
                password: hash
            }).write();
            res.send(`<script>alert('비밀번호가 변경되었습니다!');
        location.href='/${post.id}/userinfo';</script>`);
        });
    });
})

module.exports = router;