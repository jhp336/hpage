var http=require('http');
var cookie=require('cookie')
http.createServer(function(request,response){
    var cookies={};
    if(request.headers.cookie!==undefined)
    cookies = cookie.parse(request.headers.cookie);
    response.writeHead(200,{
        'Set-Cookie':['yummy_cookie=choco','tasty_cookie=strawberry',
        `wow=lol; Max-Age=${10*60}`,
        'Secure=sec;HttpOnly',
    'path=path; Path=/path',
    'domain=domain;Domain=o2.org']
    });
    response.end('cookie!!');
    
}).listen(8000); 
