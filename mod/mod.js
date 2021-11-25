module.exports = { 
    HTML: function (title, js, body) {
        return `
        <!DOCTYPE html>
        <html class="bgimg">
            <head>
                <link rel="stylesheet" href="/css/style.css">
                <meta charset="utf-8">
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
                <script src="/js/${js}.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
                <title>${title}</title>
            </head>
            ${body}
        </body>            
    </html>
        `
    },
    LOGIN: function (msg) {
        wrong = '';
        if (msg != "")
            wrong = `<script>$('#id').focus()</script>`;

        return `<body onkeydown="enterpress()">
        <header>
        <h1>로그인</h1>
        <p style="font-weight:bold;">계정에 로그인을 해주세요!</p>
        </header>
        <form id="new" name="login" method="post" action="/auth/login">
        <table>
            <tr>
                <td><input class="inputbox" name="user_id" id="id" type="text" placeholder="아이디"></td>
            </tr>
            <tr>
                <td><input class="inputbox" name="user_pw" id="pw" type="password" placeholder="비밀번호"></td>
            </tr>
            <tr style="text-align: right; color:red;"><td id="msg">${msg}</td></tr>
        </table>     
        <div style="text-align: center;">
            <input id="login" class="loginbtn btncss" type="button" value="로그인" onclick="Login('#new')">
        </div>
        <div style="text-align: center;"><a href="/home/findidpw">아이디/비밀번호를 잊으셨나요?</a></div>
        <div style="text-align: center;"><a href="/home/newaccount">계정이 없으신가요?</a></div>
        </form>${wrong}`
    },
    NEWACC: function () {
        return `<body onkeydown="enterpress()">
        <header>
    <h1>회원가입</h1>
     <p style="font-weight:bold;">새 계정을 만들어 보세요!</p>
        </header>
        <form id="new" name="new" method="post" action="/auth/join">
            <table>
                <tr>
                    <td><label for="name"><span class="star">* </span>성명</label></td>
                    <td><input class="inputbox2" name="name" id="name" type="text" placeholder="성명(한글 1~12)"></td>
                </tr>
                <tr>
                    <td><label for="nickname"><span class="star">* </span>닉네임</label></td>
                    <td>
                        <input class="inputbox2" id="nickname" name="nickname" type="text" placeholder="닉네임(한글/영문 포함 2~12)" oninput="nicknamechange()">
                        <button id="nicknamedupcheck" type="button" style="cursor:pointer;" onclick="duplicheck()">중복확인</button>
                        <input type="text" class="dupli" id="nicknamedupok" value="사용 가능" hidden disabled>
                    </td>
                </tr>
                <tr>
                    <td><label for="id"><span class="star">* </span>아이디</label></td>
                    <td><input class="inputbox2" name="id" id="id" type="text" placeholder="아이디(영문+숫자 4~12)" oninput="idchange()">
                    <button id="iddupcheck" type="button" style="cursor:pointer;" onclick="duplicheck_()">중복확인</button>
                    <input type="text" class="dupli" id="iddupok" value="사용 가능" hidden disabled>
                </tr>
                <tr>
                    <td><label for="pw"><span class="star">* </span>비밀번호</label></td>
                    <td><input class="inputbox2" name="pw" id="pw" type="password" placeholder="비밀번호(영문+숫자(+특문) 4~12)"></td>
                </tr>
                <tr>
                    <td><label for="pwc"><span class="star">* </span>비밀번호 확인</label></td>
                    <td><input class="inputbox2" name="pwc" id="pwc" type="password" placeholder="비밀번호 확인"></td>
                </tr>
                <tr>
                    <td><label for="email1"><span class="star">* </span>이메일</label></td>
                    <td><input class="inputbox2" name="email1" id="email1" type="text" placeholder="이메일(4~14 자리)" style="width:110px;"> @
                        <select name="email2" id="email2" class="inputbox2" style="width:133px; height: 30px;" onchange="email(this)">
                            <option value="none">::선택::</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="hanmail.net">hanmail.net</option>
                            <option value="nate.com">nate.com</option>
                            <option value="직접 입력">직접 입력</option>
                        </select>
                        <input class="inputbox2" name="email3" id="email3" type="text" placeholder="이메일 입력" style="width:109px" hidden>
                    </td>
                </tr>
                <tr>
                    <td><label for="direct"><span>&nbsp&nbsp</span>분실 시 질문</label></td>
                    <td>
                        <select name="quest" id="quest" class="inputbox2" style="width:219px; height: 30px;"onchange="question(this)">
                            <option value="">::선택::</option>
                            <option value="별명은?">별명은?</option>
                            <option value="고향은?">고향은?</option>
                            <option value="dir">직접 입력</option>
                        </select>
                    </td>                        
                </tr>
                <tr>
                    <td></td>
                    <td><input class="inputbox2" type="text" name="direct" id="direct" placeholder="질문을 입력하세요" hidden></td>
                </tr>
                <tr>
                    <td><label for="ans"><span>&nbsp&nbsp</span>답변</label></td>
                    <td><input class="inputbox2" type="text" name="ans" id="ans" disabled ></td>
                </tr>
                <tr>
                    <td><span>&nbsp&nbsp</span>생년월일</label></td>
                    <td>
                        <input class="inputbox2" name="year" id="year" type="text" placeholder="년도(4자리)" maxlength="4" style="width: 67px;">
                        <select class="inputbox2" name="month" id="month" style="width:60px; height: 30px; " >
                        <option>월</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        </select>
                        <input class="inputbox2" type="text" name="day" id="day" placeholder="일" maxlength="2" style="width: 33px;">
                    </td>
                </tr>
                <tr>
                    <td></td><td><div style="text-align: right; font-size: x-small;"><span class="star">* </span>표시는 필수 입력</div></td>
                </tr>
                <tr><td><br></td></tr>
                <input type="hidden" name="nicknamebool" id="nicknamebool">
                <input type="hidden" name="idbool" id="idbool">

            </table>             
            <div style="text-align: center;">      
                <button class="click btncss" type="button" onclick="
                Check('#new');
                ">완료</button>
                <input class="click btncss" type="button" value="취소" onclick="
                location.href='/home/login'
                ">
            </div> 
        </form>`
    },
    FINDIDPW: function (opt, msg, tmp) {
        var head=`<body onkeydown="enterpress()">`;
        var head_='<body>'
        var part = `<header>
        <h1>아이디/비밀번호 찾기</h1>
        <p><a href="/home/login">로그인 화면으로</a></p>    
        </header>
        <div style="text-align: center;">
        <input class="findbtn btncss" id="idfind" type="button"  value="아이디 찾기" style="background-color: rgb(241, 237, 237);" onclick="
        clickbtn(this);
        ">
        <input class="findbtn btncss" id="pwfind" type="button" value="비밀번호 찾기"style="background-color: rgb(176, 182, 182)" onclick="
        clickbtn(this);
        ">
        </div>
        <form id="new" onsubmit="return false;" method="post" action="/home/findidpw">
        `

        if (!opt) //찾기 전
            return head+part +
                `<table>
        <tr>
            <td><input class="inputbox" name= "name" id="name" type="text" placeholder="성명"></td>
        </tr>
        <tr>
            <td><input class="inputbox" name="email" id="email" type="text" placeholder="이메일"></td>
        </tr>
        <tr style="text-align: right; color:red;"><td id="msg"></td></tr>        
        </table>
        <div style="text-align: center; margin-top:10px;">
            <button class="click btncss" type="button" onclick="Pressbtn('#new')">확인</button>
            </div>
        </form>`;

        var result = `<table>
                    <tr>
                        <td>${opt} 찾기 결과</td><td></td>
                    </tr>
                    <tr>
                        <td><input class="inputbox3" type="text" disabled value="${msg}"></td>
                    </tr>
                </table>
            <br>
            </form>`;
        if (opt === "아이디") {
            return head_+part + result;
        }
        if (opt === "비밀번호") {
            var btn = `<script>
            $('#pwfind').css("background-color", "rgb(241, 237, 237)");
            $('#idfind').css("background-color", "rgb(176, 182, 182)");
            </script>`
            if (!msg.question) {//계정 정보x 혹은 질문 답변까지 완료 시
                if(!tmp)
                return head_+ part + btn + result;
                return head_+part+btn+`
                <table>
                    <tr>
                        <td>임시 ${opt} 발급</td><td></td>
                    </tr>
                    <tr>
                        <td style="text-align:center"><input style="background-color: rgb(241, 237, 237);" class="inputbox3" id="tmppw" type="text" readonly value="${msg}"></td>
                    </tr>
                    <tr>
                        <td style="text-align:center"><button type="button" data-clipboard-target="#tmppw" id="copybtn" class="btncss" onclick="copy()">복사하기</button></td>
                    </tr>
                    <tr>
                        <td id="copyok" style="text-align:center; font-size:12px; color:rgb(8, 109, 104)"><br></td>
                    </tr>
                    <tr>
                        <td style="text-align:center; font-weight: bold; color:rgb(139, 7, 7)">
                        해당 비밀번호를 복사하여 로그인 후 <br>비밀번호를 반드시 변경해주세요!</td>
                    </tr>
                </table>
            <br>
            </form>
                `
            }
            var id = msg.id;
            msg = msg.question;
            return head+part + btn
                + `<table>
            <tr>
                <td>${opt} 찾기 결과</td><td></td>
            </tr>
            <tr>
                <td><input class="inputbox3" type="text" disabled value="${msg}"></td>
            </tr>
            <tr>
                <td><input class="inputbox3" type="text" id="answer" name="answer" placeholder="답변"></td>
            </tr>
            <input type="hidden" name="id" value="${id}">
            <tr style="text-align: right; color:red;"><td id="msg"></td></tr>        
            </table>
            <div style="text-align: center; margin-top:10px;">
                <button class="click btncss" type="button" onclick="Pressbtn('#new')">확인</button>
            </div>
            </form>
            `
        }

    }

}
