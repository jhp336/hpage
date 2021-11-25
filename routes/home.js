var express = require('express');
var router = express.Router();
var mod = require('../mod/mod.js');
var db = require('../mod/db.js');
var dup = require('../mod/dupli.js');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
/*const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))*/
router.use(express.urlencoded({extended:false}))

router.get('/login', function (req, res) {
    var flash = req.flash();
    var msg = '';
    if (flash.error) {
        msg = flash.error;
    }
    var body = mod.LOGIN(msg);
    var html = mod.HTML('로그인', 'login', body);
    res.send(html);
});
router.get('/newaccount', function (req, res) {
    var body = mod.NEWACC();
    var html = mod.HTML('회원가입', 'newaccount', body);
    res.send(html);
});
router.get('/findidpw', function (req, res) {
    var body = mod.FINDIDPW();
    var html = mod.HTML('아이디/비번 찾기', 'findidpw', body);
    res.send(html);
});
router.post('/newaccount', function (req, res) {
    res.send(dup.dupli_new(req, '닉네임', 'nickname'));
})
router.post('/newaccount_', function (req, res) {
    res.send(dup.dupli_new(req, '아이디', 'id'));
})
router.post('/findidpw', function (req, res) {
    var post = req.body;
    var name = post.name;
    var email = post.email;
    var id = post.id;
    var ans = post.answer;
    var user = '';
    var body = '';
    var html = '';
    if (!ans) {
        if (!id) {//아이디찾기
            var user = db.get('users').find({
                name: name,
                email: email
            }).value();
            if (!user)
                body = mod.FINDIDPW('아이디', '해당 이름, 이메일로 가입한 계정이 없습니다!');
            else body = mod.FINDIDPW('아이디', user.id);
            html = mod.HTML('아이디/비번 찾기', 'findidpw', body);
            res.send(html);
            return;
        }
        user = db.get('users').find({ //비밀번호찾기1
            name: name,
            id: id
        }).value();
        if (!user)
            body = mod.FINDIDPW('비밀번호', '해당 이름, 아이디로 가입한 계정이 없습니다!');
        else if (!user.answer.trim())
            body = mod.FINDIDPW('비밀번호', '질문 등록 안 해서 못 찾음ㅋㅋ');
        else body = mod.FINDIDPW('비밀번호', user);
        html = mod.HTML('아이디/비번 찾기', 'findidpw', body);
        res.send(html);
        return;
    }
    user = db.get('users').find({//비밀번호 찾기2
        id: id,
        answer: ans
    }).value();
    if (!user)
        body = mod.FINDIDPW('비밀번호', `질문에 대한 답변이 일치하지 않습니다!`);
    else {
        var tmppw = shortid.generate();
        bcrypt.hash(tmppw, 10, function (err, hash) {
            db.get('users').find({
                id: id,
                answer: ans
            }).assign({
                password: hash
            }).write();
        });
        body = mod.FINDIDPW('비밀번호', tmppw, 1);
    }
    html = mod.HTML('아이디/비번 찾기', 'findidpw', body);
    res.send(html);
})

module.exports = router; 