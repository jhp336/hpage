
Write = function (form) {
    var title = $('#title')
    if (title.val().trim() === "") {
        $('#msg1').html('제목을 입력하세요!');
        $('#msg2').html('<br>')
        title.focus();
        return;
    }
    var main = $('#maintxt')
    if (main.val().trim() === "") {
        $('#msg1').html('<br>')
        $('#msg2').html('내용을 입력하세요!');
        main.focus();
        return;
    }
    $(form).attr('onsubmit', true);
    $(form).submit();
}
Delete = function (form, opt) {
    $(form).attr('action', `/${opt}/delete`);
    $(form).attr('onsubmit', true);
    $(form).submit();
}
Candelete = function (postid, id) {
    if (postid != id)
        $('.owneronly').hide();
}
author = function () {
    $('html').click(function (e) {
        $('.arrow_box').attr('hidden', true);
        if($(e.target).attr('class') === 'author'){
            var id = $(e.target).attr('id');
            var author=$(e.target).attr('name');
            $(`#author${id}`).html(`<span><a href="/square/search/id/${author}">작성글 보기</a></span><br><a href="/${author}/userinfo"><span>회원 정보</span></a>`)
            $(`#author${id}`).attr('hidden', false);
        }
    });
}
cmnt=function(form,opt){
    if($('#comment').val().trim()==='')
    return;
    $(form).attr('action',`/${opt}/comment`);    
    $(form).attr('onsubmit', true);
    $(form).submit();
}
hoverin=function(i,cmntid,userid,r){
    $(`#author${i}${r}`).show();
    if(cmntid!=userid)
    $(`.notauthor${i}${r}`).hide();
}
hoverout=function(i,r){
    $(`#author${i}${r}`).hide();
}
cmntmodify=function(i,opt,postno,cmntno,reply){
    var cmnt=$(`#cmnt${i}`).html().replace(/(?:<br>)/g, '\r\n');
    $(`#cmnt${i}`).html(`
    <form method="post" action="/${opt}/cmnt_mod">
        <textarea name="cmnt_mod">\r\n${cmnt}</textarea>
        <input type="hidden" name="num" value="${postno}"> 
        <input type="hidden" name="cmntnum" value="${cmntno}">
        <input type="hidden" name="reply" value="${reply}">
    </form>
    `);
    cmnt=cmnt.replace(/(?:\r\n|\r|\n)/g, '<br>');
    $(`#author${i}`).html(`
    <span style="cursor:pointer" onclick="modok()">확인 </span>
    <span style="cursor:pointer" onclick="modcancel('${i}','${cmnt}','${opt}','${postno}','${cmntno}','${reply}')">취소</span>
    `);
}//댓글 수정
modok=function(){
    $('form').submit();
}//수정 확인
modcancel=function(i,cmnt,opt,postno,cmntno,reply){
    $(`#cmnt${i}`).html(`${cmnt}`);
    if(reply==='undefined')
    $(`#author${i}`).html(`
    <span style="cursor:pointer" id="reply${i}" onclick="cmntreply('${i}','${opt}')">답글 </span>
    `);
    else $(`#author${i}`).html(``);
    $(`#author${i}`).append(
    `<span style="cursor:pointer" class="notauthor${i}" onclick="cmntmodify('${i}','${opt}','${postno}','${cmntno}','${reply}');">수정 </span>
    <span style="cursor:pointer" class="notauthor${i}" onclick="cmntdelete('${i}','${opt}','${postno}','${cmntno}','${reply}')">삭제</span>
    `)
}//수정 취소 
cmntdelete=function(i,opt,postno,cmntno,reply){
    $(`#cmnt${i}`).html(`
    <form method="post" action="/${opt}/cmnt_del">
        <input type="hidden" name="num" value="${postno}"> 
        <input type="hidden" name="cmntnum" value="${cmntno}">
        <input type="hidden" name="reply" value="${reply}">
    </form>`)
    $('form').submit();
}//댓글 삭제
cmntreply=function(i,opt,postno,cmntno){
    $(`#reply${i}`).hide();
    $(`#${i}`).append(`
    <div id="cmntreply${i}">
        <form method="post" action="/${opt}/cmnt_reply">
        <div style="margin-top:10px;">
        ↳   <textarea id="reply" name="reply"></textarea>
            <input type="hidden" name="postno" value="${postno}">
            <input type="hidden" name="cmntno" value="${cmntno}">
            <input type="button" id="replysubmit" value="등록" onclick="$('form').submit()">
        </div>
        </form>
        <div style="cursor:pointer;text-align:right;font-size:smaller;" onclick="replycancel(${i})">취소</div>
    </div>
    `)
    $('#reply').focus();
}
replycancel=function(i){
    $(`#reply${i}`).show();
    $(`#cmntreply${i}`).remove();
}