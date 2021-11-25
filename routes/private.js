var express = require('express');
const db = require('../mod/db.js');
var router = express.Router();
var mod = require('../mod/mod.js');
var mod2 = require('../mod/mod2.js');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
var shortid = require('shortid');

router.get('/',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var dbpost=db.get('secret').filter({
        id:req.user.id
    }).value();
    var body=mod2.header(req.user.nickname,req.user.id)+mod2.square(dbpost,'private')
    var html=mod.HTML('비밀게시판','write',body);
    res.send(html);
})
router.get('/write',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var body=mod2.write('','')+
    `<script>$('#post').attr('action','/private/write');</script>`;
    var html=mod.HTML('비밀글 쓰기','write',body);
    res.send(html);
})
router.post('/write',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post=req.body;
    var dt= new Date;
    var month=(dt.getMonth()+1);
    if (month < 10 && month[0] != '0' && month != '') month = '0' + month;
    var day=dt.getDate();
    if (day < 10 && day[0] != '0' && day != '') day = '0' + day;
    var now = month+'/'+day;
    var prvpost=db.get('secret').filter({
        id:req.user.id,
    }).value();
    var num=1;
    if(prvpost.length!=0)
    num=prvpost[prvpost.length-1].no+1;
    db.get('secret').push({
        no:num,
        title:post.title,
        maintxt:post.maintxt,
        date:now,
        author:req.user.nickname,
        id:req.user.id,
        cmntcount:0,
        comment:[]
    }).write();
    res.redirect('/private')
})
router.get('/:postno',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var num=Number(req.params.postno);
    var post=db.get('secret').find({
        no:num,
        id:req.user.id,
    }).value();
    if(!post) 
    res.status(404).send(`<script>alert('게시글이 존재하지 않습니다!');
    window.history.back();</script>`);
    var body=mod2.post(post,req.user.id,'private');
    var html=mod.HTML(`비밀글 보기-${post.title}`,'write',body);

    res.send(html);
})
router.post('/modify',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post=req.body;
    var body=mod2.write(post.title,post.maintxt,post.num)+
    `<script>$('#post').attr('action','/private/modify_');</script>`;
    var html=mod.HTML(`글 수정-${post.title}`,'write',body)
    res.send(html);
})
router.post('/modify_',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post=req.body
    db.get('secret').find({
        no:Number(post.num),
        id:req.user.id,
    }).assign({
        title:post.title,
        maintxt:post.maintxt
    }).write();
    res.redirect(`/private/${post.num}`);
})
router.post('/delete',function(req,res){
    if(!req.user){
        res.send(`<script>alert('권한이 없습니다!');location.href='/';</script>`)
        return;
    }
    var post=req.body;
    db.get('secret').remove({
        no:Number(post.num),
        id:req.user.id
    }).write();
    res.send(`<script>alert('삭제되었습니다!');location.href='/private'</script>`)
})
router.post('/comment',function(req,res){
    var post = req.body;
    var dt= new Date;
    var month=(dt.getMonth()+1);
    if (month < 10 && month[0] != '0' && month != '') month = '0' + month;
    var day=dt.getDate();
    if (day < 10 && day[0] != '0' && day != '') day = '0' + day;
    var hour = dt.getHours();
    if (hour < 10) hour = '0' + hour;
    var min = dt.getMinutes();
    if (min < 10) min = '0' + min;
    var now = month+'/'+day+' '+hour+':'+min;

    db.get('secret').find({
        no:Number(post.num)
    }).get('comment').push({
        no:shortid.generate(),
        nickname:req.user.nickname,
        id:req.user.id,
        date:now,
        comment:post.comment,
        reply:[]
    }).write();
    db.get('secret').find({
        no:Number(post.num)
    }).assign({
        cmntcount:db.get('secret').find({
            no:Number(post.num)
        }).get('cmntcount').value()+1
    }).write();

    res.redirect(`/private/${post.num}`);
})
router.post('/cmnt_mod',function(req,res){
    var post=req.body;
    if (post.reply === 'undefined') {
        db.get('secret').find({
            no:Number(post.num)
        }).get('comment').find({
            no:post.cmntnum
        }).assign({
            comment:post.cmnt_mod
        }).write();
    }   
    else{
        db.get('secret').find({
            no:Number(post.num)
        }).get('comment').find({
            no:post.cmntnum
        }).get('reply').find({
            no:post.reply
        }).assign({
            comment:post.cmnt_mod
        }).write();
    }
    res.redirect(`/private/${post.num}`);
})
router.post('/cmnt_del',function(req,res){
    var post=req.body;
    var targetreply=db.get('secret').find({
        no: Number(post.num)
    }).get('comment').find({
        no: post.cmntnum
    });
    if (post.reply === 'undefined') { //댓글삭제
        if(targetreply.get('reply').value().length)//답글이 있을시 삭제된 댓글임을 표시
        targetreply.assign({
            nickname: "",
            id: "",
            date: "",
            comment: "삭제된 댓글입니다",
        }).write();
        else db.get('secret').find({//답글 없으면 그냥 삭제
            no: Number(post.num)
        }).get('comment').remove({
            no:post.cmntnum
        }).write();
    }
    else { //답글삭제
        targetreply.get('reply').remove({
            no:post.reply
        }).write();
        if(targetreply.get('id').value()===''&&(!targetreply.get('reply').value().length)){
            //삭제된 댓글의 유일한 답글일시 댓글도 삭제
            db.get('secret').find({
                no: Number(post.num)
            }).get('comment').remove({
                no:post.cmntnum
            }).write();
        }
    } 
    db.get('secret').find({
        no:Number(post.num)
    }).assign({
        cmntcount:db.get('secret').find({
            no:Number(post.num)
        }).get('cmntcount').value()-1
    }).write();
    res.redirect(`/private/${post.num}`);
})
router.post('/cmnt_reply', function (req, res) {
    var post = req.body;
    var dt = new Date;
    var month = (dt.getMonth() + 1);
    if (month < 10 && month[0] != '0' && month != '') month = '0' + month;
    var day = dt.getDate();
    if (day < 10 && day[0] != '0' && day != '') day = '0' + day;
    var hour = dt.getHours();
    if (hour < 10) hour = '0' + hour;
    var min = dt.getMinutes();
    if (min < 10) min = '0' + min;
    var now = month + '/' + day + ' ' + hour + ':' + min;
    db.get('secret').find({
        no: Number(post.postno)
    }).get('comment').find({
        no: post.cmntno
    }).get('reply').push({
        no: shortid.generate(),
        nickname: req.user.nickname,
        id: req.user.id,
        date: now,
        comment: post.reply
    }).write();
    db.get('secret').find({
        no: Number(post.postno)
    }).assign({
        cmntcount: db.get('secret').find({
            no: Number(post.postno)
        }).get('cmntcount').value() + 1
    }).write();

    res.redirect(`/private/${post.postno}`);
})
module.exports=router;