function clickbtn(but) {
    $('body').attr('onkeydown',"enterpress()")
    var btn2, btn = $(but)
    if (btn.attr('id') === 'idfind') {
        btn2 = $('#pwfind');
        $('form').html(`
        <table>
            <tr>
                <td><input class="inputbox" name= "name" id="name" type="text" placeholder="성명"></td>
            </tr>
            <tr>
                <td><input class="inputbox" name="email" id="email" type="text" placeholder="이메일"></td>
            </tr>
            <tr style="text-align: right; color:red;"><td id="msg"></td></tr> 
        </table>
        <div style="text-align: center; margin-top:10px;">
            <input class="click btncss" type="button" value="확인"  onclick="Pressbtn('#new')">
        </div>`)
    }
    else {
        btn2 = $('#idfind');
        $('form').html(`
        <table>
            <tr>
                <td><input class="inputbox" name="name" id="name" type="text" placeholder="성명"></td>
            </tr>
            <tr>
                <td><input class="inputbox" name="id" id="id" type="text" placeholder="아이디"></td>
            </tr>
            <tr style="text-align: right; color:red;"><td id="msg"></td></tr> 
        </table>
        <div style="text-align: center; margin-top:10px;">
            <input class="click btncss" type="button" value="확인"  onclick="Pressbtn('#new')">
        </div>`);
    }
    if (btn.css("background-color") != "rgb(241, 237, 237)") {
        btn.css("background-color", "rgb(241, 237, 237)");
        btn2.css("background-color", "rgb(176, 182, 182)");
    }
}

enterpress = function () {
    if (window.event.keyCode == 13)
        Pressbtn('#new');
}
Pressbtn = function (form) {
    var NAME = $('#name');
    var EMAIL = $('#email');
    var ID = $('#id');
    var ANS =$('#answer');
    if (NAME.val() === "") {
        $('#msg').html('이름을 입력해주세요');
        NAME.focus();
        return;
    }
    if (EMAIL.val() === "") {
        $('#msg').html('이메일을 입력해주세요');
        EMAIL.focus();
        return;
    }
    if (ID.val() === "") {
        $('#msg').html('아이디를 입력해주세요');
        ID.focus();
        return;
    }
    if(ANS.val()===""){
        $('#msg').html('답변을 입력해주세요');
        ANS.focus();
        return;
    }
    $(form).attr('onsubmit',true);
    $(form).submit();
} 
copy=function(){
    var clipboard = new ClipboardJS('#copybtn');
    clipboard.on('success',function(){
        $('#copyok').html('복사 완료!')
    })
}
