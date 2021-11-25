clickmodify=function(){
    $('body').attr('onkeydown',"enterpress__()")
    $('#modify').attr('hidden', true);
    $('.modif3').attr('hidden',false);
    $('#pw').focus();
}//수정 버튼클릭 
pwcheck=function(form){
    if ($('#pw').val() === '') {
        $('#msg').html('계정의 비밀번호를 입력해주세요!');
        $('#pw').focus();
        return;
    }
    $(form).submit();
}
Modify = function (answer, dup) {//dup=1이면 중복확인 완료 0이면 확인 전
    $('.modif2').attr('disabled', false);
    if (dup === 1){
        $('#nicknamedupcheck').attr('hidden',true);
        $('#nicknamedupok').attr('hidden', false);
        $('#nicknamebool').val(1);
    }
    
    else {
        var len=$('#nickname').val().length;
        $('#nicknamedupcheck').attr('hidden', false);
        $('#nickname').focus();
        $('#nickname')[0].setSelectionRange(len,len);//커서 끝으로 하기위함
        alert('해당 닉네임이 이미 있습니다. 다시 정해주세요!');       
    }
    $("#ans").attr('style', '');
    $('#ans').val(answer);

    $('#modify').attr('hidden', true);
    $('.modif').attr('hidden', false);
    $('body').attr('onkeydown',"enterpress()")
    $('.modif2').css('font-weight','')
}//수정창
duplicheck = function (id) {
    var test = /^(?=.*[a-zA-Z]|.*[가-힣])[a-zA-Z0-9가-힣]{2,10}$/;
    if (!test.test($('#nickname').val())) {
        alert('닉네임은 한글 또는 영문을 포함한 2~10 글자로 공백없이 작성해주세요');
        $('#nickname').focus();
        return;
    }

    $('#new').attr('action', `/${id}/userinfo_`);
    $('#new').submit();
}//중복 확인
nicknamechange = function () {
    $('#nicknamebool').val('');                    //중복확인 필요
    $('#nicknamedupok').attr('hidden', true);
    $('#nicknamedupcheck').attr('hidden', false);    //사용가능->중복확인 
}//닉네임 칸 내용 변경시

Check = function (form) {
    var NAME = $('#name');
    var test1 = /^[가-힣]{1,12}$/;
    if (!test1.test(NAME.val())) {
        alert('이름을 한글 1~12자리로 공백없이 작성해주세요');
        NAME.focus();
        return;
    }
    //이름 처리

    var NICK = $('#nickname');
    var test2 = /^(?=.*[a-zA-Z]|.*[가-힣])[a-zA-Z0-9가-힣]{2,10}$/;
    if (!test2.test(NICK.val())) {
        alert('닉네임을 한글 또는 영문을 포함한 2~10 글자로 공백없이 작성해주세요');
        NICK.focus();
        return;
    }//닉네임 처리

    var em=$('#email');
    var test_ = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,14}[\@]{1}[a-zA-Z.]{2,12}[a-z]{1}[.]{1}[a-zA-Z]{2,3}$/;
    if(!test_.test(em.val())){
        alert('이메일을 형식에 맞게 입력해주세요!');
        em.focus();
        return;
    }//이메일 처리

    var dup1 = $('#nicknamebool').val();
    if (dup1 != '1') {
        alert('닉네임 중복확인을 해주세요!');
        NICK.focus();
        return;
    }  //중복 확인 처리

    if ($('#quest').val().trim() != '' && $('#ans').val().trim() === '') {
        alert('질문에 답변을 해주세요!');
        $('#ans').focus();
        return;
    }
    if ($('#quest').val().trim() === '' && $('#ans').val().trim() != '') {
        alert('질문이 없는데 답변이 있습니다..?');
        $('#quest').focus();
        return;
    }
    //질문 답변 입력시 처리

    if ($('#year').val()) {
        var test5 = /^[0-9]{4,4}$/;
        if (!test5.test($('#year').val())) {
            alert('년도는 4자리 숫자로!');
            $('#year').focus();
            return;
        }
    }
    if ($('#month').val()) {
        var val = $('#month').val();
        var test6 = /^[0-9]{1,2}$/;
        if (!test6.test(val) || val < 1 || val > 12) {
            alert('태어난 달은 1~12 사이의 숫자로!!');
            $('#month').focus();
            return;
        }
    }
    if ($('#day').val()) {
        var val = $('#day').val();
        var test6 = /^[0-9]{1,2}$/;
        if (!test6.test(val) || val < 1 || val > 31) {
            alert('날짜는 1~31 사이의 숫자로!!');
            $('#day').focus();
            return;
        }
    }//생년월일 처리
    var id=$('#id').val();
    $(form).attr('action',`/${id}/userinfo/modify`)
    $(form).submit();
}
enterpress = function () {
    if (window.event.keyCode == 13)
        Check('#new');
}

enterpress_ = function () {
    if (window.event.keyCode == 13)
        pwchange('#new');
}

enterpress__ = function () {
    if (window.event.keyCode == 13)
        pwcheck('#new');
}

function clickbtn(but, id, nick, name, email, quest, year, month, day) {
    var btn2, btn = $(but)
    if (btn.attr('id') === 'basicinf') {
        $('body').attr('onkeydown',"");
        $('form').attr('action',`/${id}/userinfo`);
        
        btn2 = $('#pwinf');
        $('form').html(`<div style="text-align:center">
        <input style="border:2px double" class="inputbox3" value="ID: ${id}" disabled>
        <input type="hidden" name="id" value="${id}" hidden>
        </div>
        <br>
        <table>    
        <tr>
            <td><label for="name"><span class="star modif" hidden>* </span>성명</label></td>
            <td><input class="inputbox2 modif2" name="name" id="name" type="text" value="${name}" disabled></td>
        </tr>
        <tr>
            <td><label for="nickname"><span class="star modif" hidden>* </span>닉네임</label></td>
            <td>
                <input class="inputbox2 modif2" id="nickname" name="nickname" type="text" value="${nick}" disabled oninput="nicknamechange()">
                <button id="nicknamedupcheck" type="button" style="cursor:pointer;" onclick="duplicheck('${id}');"hidden>중복확인</button>
                <input type="text" class="dupli" id="nicknamedupok" value="사용 가능"hidden disabled>
            </td>
        </tr>
        <tr>
            <td><label for="email"><span class="star modif" hidden>* </span>이메일</label></td>
            <td><input class="inputbox2 modif2" name="email" id="email" type="text" value="${email}" disabled></td>
        </tr>
        <tr>
            <td><label for="quest">분실 시 질문</label></td>
            <td>
                <input name="quest" id="quest" class="inputbox2 modif2" type="text" value="${quest}" disabled>
            </td>                        
        </tr>
        <tr>
            <td><label for="ans">답변</label></td>
            <td><input class="inputbox2 modif2" type="text" name="ans" id="ans" value="수정 시 볼 수 있습니다" style="font-style: italic; color:red" disabled ></td>
        </tr>
        <tr>
            <td>생년월일</label></td>
            <td>
                <input class="inputbox2 modif2" name="year" id="year" type="text" value="${year}" maxlength="4" style="width: 67px;" disabled>
                <input class="inputbox2 modif2" type="text" name="month" id="month" style="width:27px;" value="${month}" maxlength="2" disabled>
                <input class="inputbox2 modif2" type="text" name="day" id="day" value="${day}" maxlength="2" style="width: 27px;" disabled>
            </td>
        </tr>
        <tr class="modif" hidden>
            <td></td><td><div style="text-align: right; font-size: x-small;"><span class="star">* </span>표시는 필수 입력</div></td>
        </tr>
        <input type="hidden" name="nicknamebool" id="nicknamebool">
        </table>
        <br>
        <div style="text-align: center;">      
                <input class="click btncss" type="button" id="modify" value="수정" onclick="clickmodify();">
                <input class="inputbox2 modif3" type="password" id="pw" name="pw" placeholder="비밀번호" hidden>
                <p><input class="click modif3 btncss" type="button" value="확인" hidden onclick="pwcheck('#new')"></p>
                <div style="text-align: center; color:red; font-size:14px;" id="msg"></div>
                <p><input class="click modif btncss" type="button" value="완료" hidden onclick="Check('#new')">
                <input class="click modif btncss" type="button" value="취소" hidden onclick="
                location.href='/${id}/userinfo'
                "><p>
        </div> `);
        $('.modif2').css('font-weight','bold');
    }
    else {
        btn2 = $('#basicinf');
        $('body').attr('onkeydown',"enterpress_()")
        $('form').attr('action',`/${id}/pwchange`)
        $('form').html(`
        <input type="hidden" name="id" value="${id}" hidden>
            <table>
                <tr>
                    <td><label for="current">현재 비밀번호</label></td>
                    <td><input type="password" class="inputbox2" id="current" name="current" placeholder="현재 비밀번호"></td>
                </tr>
                <tr>
                    <td><label for="newer">새 비밀번호</label></td>
                    <td><input type="password" class="inputbox2" id="newer" name="newer" placeholder="새 비밀번호"></td>
                </tr>
                <tr>
                    <td><label for="newerc">새 비밀번호 확인</label></td>
                    <td><input type="password" id="newerc" class="inputbox2" placeholder="새 비밀번호 확인"></td>
                </tr>
                <tr style="text-align: right; color:red;font-size:14px"><td></td><td id="msg"><br></td></tr>             
            </table>
            <div style="text-align: center;">      
                <input class="click btncss" type="button" value="완료" onclick="pwchange('#new')">
            </div>` )
    }
       
    if (btn.css("background-color") != "rgb(241, 237, 237)") {
        btn.css("background-color", "rgb(241, 237, 237)");
        btn2.css("background-color", "rgb(176, 182, 182)");
    }
}
pwchange = function(form){
    var cur = $('#current');
    if(cur.val()===""){
        $('#msg').html('현재 비밀번호를 입력하세요!');
        cur.focus()
        return;
    }
    var newer = $('#newer');
    if(newer.val()===""){
        $('#msg').html('새 비밀번호를 입력하세요!');
        newer.focus()
        return;
    }
    var test = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9~!@#$%^&*?]{4,12}$/;
    if (!test.test(newer.val())) {
        alert('비밀번호를 영문과 숫자 4~12자리로 공백없이 작성해주세요 + 특수문자 ~!@#$%^&*? 포함 가능!')
        newer.focus();
        return;
    }
    var newerc= $('#newerc');
    if(newerc.val()===""){
        $('#msg').html('비밀번호 확인 칸을 입력하세요!');
        newerc.focus()
        return;
    }
    if(newer.val()!=newerc.val()){
        $('#msg').html('비밀번호 확인 불일치입니다!')
        newerc.focus()
        return;
    }
    $(form).submit();
}