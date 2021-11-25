module.exports = {
    userinfo: function (originnick, name, nick, id, email, quest, year, month, day) {
        return `<body>
        <header>
        <h1><span style="color:orange;">${originnick}</span> 님의 회원 정보</h1>
        <p><a href="/">메인 페이지로</a></p>
        </header>
        <div style="text-align: center;">
        <input class="findbtn btncss" type="button" id="basicinf" value="기본 정보" style="background-color: rgb(241, 237, 237);" onclick="
        clickbtn(this, '${id}', '${originnick}', '${name}', '${email}', '${quest}', '${year}', '${month}', '${day}')
        ">
        <input class="findbtn btncss" id="pwinf" type="button" value="비밀번호 변경" style="background-color: rgb(176, 182, 182)" onclick="
        clickbtn(this, '${id}')     
        ">
        </div>
        <form id="new" method="post" action="/${id}/userinfo">
        <div style="text-align:center">
        <input style="border:2px double" class="inputbox3" value="ID: ${id}" disabled>
        <input type="hidden" id="id" name="id" value="${id}" hidden>
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
                <button id="nicknamedupcheck" type="button" style="cursor:pointer;" onclick="duplicheck('${id}');" hidden>중복확인</button>
                <input type="text" class="dupli" id="nicknamedupok" value="사용 가능" hidden disabled>
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
            <td>생년월일</td>
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
        </div> 
        </form>
        <script>
        $('.modif2').css('font-weight','bold')
        </script>
        `
    },
    openinfo:function(name, nick, id, email, year, month, day){
        return `<body>
        <header>
        <h1><span style="color:orange;">${nick}</span> 님의 회원 정보</h1>
        <p><a href="/">메인 페이지로</a></p>
        </header>
        <div style="text-align: center;">
        <input class="findbtn btncss" type="button" id="basicinf" value="기본 정보" style="background-color: rgb(241, 237, 237);">
        </div>
        <form id="new">
        <div style="text-align:center">
        <input style="border:2px double" class="inputbox3" value="ID: ${id}" disabled>
        </div>
        <br>
        <table>    
        <tr>
            <td>성명</td>
            <td><input class="inputbox2 modif2" id="name" type="text" value="${name}" disabled></td>
        </tr>
        <tr>
            <td>닉네임</td>
            <td>
                <input class="inputbox2 modif2" id="nickname" type="text" value="${nick}" disabled>
            </td>
        </tr>
        <tr>
            <td>이메일</td>
            <td><input class="inputbox2 modif2" id="email" type="text" value="${email}" disabled></td>
        </tr>
        <tr>
            <td>생년월일</td>
            <td>
                <input class="inputbox2 modif2" id="year" type="text" value="${year}" style="width: 67px;" disabled>
                <input class="inputbox2 modif2" type="text" id="month" style="width:27px;" value="${month}"disabled>
                <input class="inputbox2 modif2" type="text" id="day" value="${day}" style="width: 27px;" disabled>
            </td>
        </tr>
        </table>
        <br>
        <script>
        $('.modif2').css('font-weight','bold')
        </script>
        `
    },
    header:function(nick,id){
        return `<body>
        <header>
            <h1><a href="/">NTBoard</a></h1>
            <div>
                <p style="font-size: 15px; font-weight: bold;">${nick}&nbsp님</p>
                <span><button style="cursor:pointer;" onclick="
                            location.href='/auth/logout'
                            ">로그아웃</button></span>
                <span><button style="cursor:pointer;" onclick="
                            location.href='/${id}/userinfo'
                            ">회원정보</button></span>
            </div>
            <br>
        </header>` 
    },
    mainpg: function (nick, id) {
        return this.header(nick,id)+

        `<div id="new">
            <table>
                <tr>
                    <td><button style="cursor:pointer;" onclick="
                    location.href='/square'
                    ">자유게시판</button></td>
                    <td><button style="cursor:pointer;" onclick="
                    location.href='/private'
                    ">비밀게시판</button></td>
                </tr>
            </table>
        </div>`
    },
    square:function(db,opt){
        var  int=`
        <div class="postlist">
            <table class="board">
            <colgroup>
                <col width="60%"/>
                <col width="25%"/>
                <col width="15%"/>
            </colgroup>
            <thead><tr style="height:30px">
                <td>제목</td>
                <td>작성자</td>
                <td>작성일</td>
            </tr></thead>`
        if(!db.length)
        var list=`</table><div style="text-align:center;margin-top:45.6px">게시글이 없습니다</div></div>`
        else {
            var list='';
            for(var i=0;i<db.length;i++){
                if(db[i].title.length>11)
                var title=db[i].title.substr(0,10)+' ...';
                else var title=db[i].title;
                if(db[i].maintxt.length>20)
                var text=db[i].maintxt.substr(0,19)+' ...';
                else var text=db[i].maintxt;
            var list= `<tr><td class="borderbtm"><div style="font-size:25px;font-weight:bold"><a href='/${opt}/`+db[i].no+`'>${title} 
            <span style="font-size:20px;color:rgb(69, 53, 95);">(${db[i].cmntcount})</span></a></div>
            <div>${text}</div></td>
            <td class="borderbtm" style="font-size:15px;text-align:center"><span class="author" id="${i}" name="${db[i].id}">${db[i].author}</span><br><div id="author${i}" class="arrow_box" hidden></div></td>
            <td class="borderbtm" style="font-size:15px;text-align:center">${db[i].date}</td></tr>`+list;
            }
            list=list+`</table></div>`;
        }    
        var end=`<div style="text-align:left;margin-left:220px">    
        <input id="write" class="postbtn" type="button" value="글쓰기" onclick="
        location.href='/${opt}/write';
        "></div><script>author()</script>`   
        return int+list+end
    },
    write:function(title,maintxt,num){
        return `
        <body>
        <form id="post" onsubmit="return false;" enctype="multipart/form-data"  method="post" action='/square/write'>
        <table>
            <tr>
                <td>
                <input type="text" class="inputbox" id="title" name="title" placeholder="제목" value="${title}"}>
                <span id="msg1" style="text-align: right; color:red;"></span>
                </td>
            </tr>
            <tr>
                <td>
                <textarea class="inputbox" id="maintxt" name="maintxt" placeholder="내용을 입력해주세요"}>${maintxt}</textarea>
                </td>
            </tr>  
            <tr style="text-align: right; color:red;"><td id="msg2"><br></td></tr>  
            <input type="hidden" name="num" value="${num}">  
        </table>    
        <div style="text-align: center;">      
                <button class="click btncss" type="button" onclick="
                Write('#post');
                ">완료</button>
                <input id="cancel" class="click btncss" type="button" value="취소" onclick="
                window.history.back();
                ">
            </div> 
        </form>
        `
    },
    post:function(post,id,opt){
        var comment='';
        for(var i=0;i<post.comment.length;i++){
            var reply='';
            for(var j=0;j<post.comment[i].reply.length;j++){
                var rcmt = post.comment[i].reply[j].comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
                reply=reply+`
                ↳<div style="margin-left:20px;margin-top:-20px;"onmouseover="hoverin('${i}','${post.comment[i].reply[j].id}','${id}','r${j}')" onmouseout="hoverout('${i}','r${j}')">
                    <div style="display:flex;justify-content:space-between">
                        <div><span style="color:rgb(53, 53, 99);">${post.comment[i].reply[j].nickname}</span>
                            <span style="color:rgb(133, 145, 151);">${post.comment[i].reply[j].date}</span>
                        </div>
                        <div id="author${i}r${j}" style="font-size:smaller;" hidden>
                            <span style="cursor:pointer" class="notauthor${i}r${j}" onclick="cmntmodify('${i}r${j}','${opt}','${post.no}','${post.comment[i].no}','${post.comment[i].reply[j].no}');">수정 </span>
                            <span style="cursor:pointer" class="notauthor${i}r${j}" onclick="cmntdelete('${i}r${j}','${opt}','${post.no}','${post.comment[i].no}','${post.comment[i].reply[j].no}')">삭제</span>
                        </div>
                    </div>
                    <div class="borderbtm cmntdiv" id="cmnt${i}r${j}">${rcmt}</div>
                </div>
                `
            }
            var cmt = post.comment[i].comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
            if(post.comment[i].id!='')
            comment=comment+`<tr><td id="${i}">
            <div onmouseover="hoverin('${i}','${post.comment[i].id}','${id}','')" onmouseout="hoverout('${i}','')">
            <div style="display:flex;justify-content:space-between">
                <div><span style="color:rgb(53, 53, 99);">${post.comment[i].nickname}</span>
                    <span style="color:rgb(133, 145, 151);">${post.comment[i].date}</span>
                </div>
                <div id="author${i}" style="font-size:smaller;" hidden>
                    <span style="cursor:pointer" id="reply${i}" onclick="cmntreply('${i}','${opt}','${post.no}','${post.comment[i].no}')">답글 </span>
                    <span style="cursor:pointer" class="notauthor${i}" onclick="cmntmodify('${i}','${opt}','${post.no}','${post.comment[i].no}');">수정 </span>
                    <span style="cursor:pointer" class="notauthor${i}" onclick="cmntdelete('${i}','${opt}','${post.no}','${post.comment[i].no}')">삭제</span>
                </div>
            </div>
            <div class="borderbtm cmntdiv" id="cmnt${i}">${cmt}</div>
            </div>`
            +reply+`</td></tr>`;
            else comment=comment+`
            <tr><td><div class="borderbtm cmntdiv">${cmt}</div>
            `+reply+`</td></tr>`;
        }
        return`<body> 
        <table>
        <form id="post" onsubmit="return false;"  method="post" action='/${opt}/modify'>
            <tr><td><div style="text-align:right">   
                <input id="postlist" class="postbtn" type="button" value="글 목록" onclick="
                location.href='/${opt}'">
                <input class="postbtn owneronly" type="button" value="글 수정" onclick="
                form.submit();
                ">
                <input class="postbtn owneronly" type="button" value="글 삭제" onclick="
                Delete('#post','${opt}')
                ">
                </div></td>
            <tr>
                <td>
                <input class="inputbox" id="title" name="title" value="${post.title}" readonly>
                <span style="margin:0 auto;color:rgb(53, 53, 99);font-weight:bold;">&nbsp&nbsp&nbsp${post.author}</span>
                </td>
            </tr>
            <tr>
                <td>
                <textarea id="maintxt" class="inputbox" name="maintxt" readonly>${post.maintxt}</textarea>
                </td>
            </tr>
            <input type="hidden" name="num" value="${post.no}">  
            <tr><td>댓글 <span style="color:black">${post.cmntcount}</span</td></tr>
            <tr>
                <td>
                <textarea id="comment" name="comment"></textarea>
                <input type="button" id="commentsubmit" value="등록" onclick="cmnt('#post','${opt}')">
                </td>
            </tr>
        </form>`
        +comment+
        `</table>
        <script>Candelete('${post.id}','${id}');</script>`
    }
}
