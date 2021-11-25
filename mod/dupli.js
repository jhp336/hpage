var mod = require('./mod.js');
var mod2 = require('./mod2.js');
var db = require('./db.js');
 
module.exports = {
    dupli_new: function (req, str, which) {
        var post = req.body;
        var body = mod.NEWACC();
        var html = mod.HTML('회원가입', 'newaccount', body);
        var add = `</script>`
        if (which == 'nickname') {
            var info = post.nickname;
            var user = db.get('users').find({
                nickname: info
            }).value();
            if (post.idbool === '1') {
                add = `$('#iddupok').attr('hidden',false);
            $('#iddupcheck').attr('hidden',true);
            $('#idbool').val('1');`+ add;        //id 사용가능 정보전달
            }
        }
        else {
            var info = post.id;
            var user = db.get('users').find({
                id: info
            }).value();
            if (post.nicknamebool === '1') {
                add = `$('#nicknamedupok').attr('hidden',false);
            $('#nicknamedupcheck').attr('hidden',true);
            $('#nicknamebool').val('1');`+ add;  //닉네임 사용가능 정보전달
            }
        }

        if (post.ans === undefined)
            post.ans = '';
        var script = `<script>
        $('#name').val('${post.name}');
        $('#nickname').val('${post.nickname}');
        $('#id').val('${post.id}');
        $('#pw').val('${post.pw}');
        $('#pwc').val('${post.pwc}');
        $('#email1').val('${post.email1}');
        $('#email2').val('${post.email2}');
        $('#email3').val('${post.email3}');
        $('#quest').val('${post.quest}');
        $('#direct').val('${post.direct}');
        $('#ans').val('${post.ans}');
        $('#year').val('${post.year}');
        $('#month').val('${post.month}');
        $('#day').val('${post.day}');
        `
        if(post.email2==="직접 입력")
        script=script+`email('#email2');`
        if (post.quest != "질문 없음") {
            script = script + `$('#ans').attr('disabled', false);`
            if (post.quest === 'dir')
                script = script + `$('#direct').show();`
        }

        if (user)//중복있는경우
            script = script + `$('#${which}').focus();
    alert('해당 ${str}이(가) 이미 있습니다. 다시 정해주세요!');`;
        else script = script + `$('#${which}dupok').attr('hidden',false);
    $('#${which}dupcheck').attr('hidden',true);
    $('#${which}bool').val('1');`; //중복 x


        return html + script + add;
    },

    dupli_mod: function (req,originnick,err) {
        var post = req.body;
        var body = mod2.userinfo(originnick, post.name, post.nickname, post.id,
        post.email, post.quest, post.year, post.month, post.day);
        var html = mod.HTML(`${originnick}님의 회원정보`, 'userinfo', body);
        var user = db.get('users').find({
            nickname: post.nickname
        }).value();
        
        if (user&&user.id!=post.id)//중복있는경우(본인인 경우는 가능!)
            var script = `<script>Modify('${post.ans}',0);</script>`;
        else var script = `<script>Modify('${post.ans}',1);</script>`; //중복 x

        return html + script;
    }

}
