var code; //在全局 定义验证码
$(function() {// 初始化内容
    createCode();
});


function createCode() { //创建验证码函数
    code = "";
    var codeLength =4;//验证码的长度
    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k',
        'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');//所有候选组成验证码的字符，当然也可以用中文的
    for(var i=0;i<codeLength;i++)
    {
        var charIndex =Math.floor(Math.random()*36);
        code +=selectChar[charIndex];
    }
    // 设置验证码的显示样式，并显示
    document.getElementById("discode").style.fontFamily="Fixedsys"; //设置字体
    document.getElementById("discode").style.letterSpacing="5px"; //字体间距
    document.getElementById("discode").style.color="#0ab000"; //字体颜色
    document.getElementById("discode").innerHTML=code; // 显示
}
function but()
{//验证验证码输入是否正确
    /*var val1=document.getElementById("t1").value;*/
    var val2=code;
   /* if(val1!=val2){
        alert("验证码错误!");
        document.getElementById('t1').value="";
    }*/
}
var user;
function login(){
    var username = $("#form-username").val();
    var password = $("#form-password").val()
    var password= hex_md5(password);
    var yzm = $("#yzm").val();
    if(yzm == code){
        var requestJson = {
            "tUserName":username,
            "tUserPwd": password
        };

        //JSON.stringify(requestJson),
        $.ajax({
            type: 'post',
            url: 'http://localhost:8077/t/sys/user/userLogin', //配置统一的连接地址
            data: JSON.stringify(requestJson),
            //设置传输到后端的数据
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                /*$("body").mLoading("hide");*/
                /*  window.parent.hide();*/
                if (data.data != null && data.code == 200) {
                    //
                    var us = {
                        'userId':data.data.tUserId,
                        'username':data.data.tUserName,
                        'userRole':data.data.tRole,
                        'userStatus': data.data.tStatus
                    };
                    user =  JSON.stringify(us);
                    $.cookie('mycookie', user,{path: '/',expires: 1});
                    alert("登陆成功！");
                    window.location.href="home.html";
                } else {
                    alert(data.message);
                }
            },
            error: function () {
                /*$("body").mLoading("hide");*/
                /* window.parent.hide();*/
                alert("后台请求失败，请重试！");

            }
        });
    }else{
        alert("验证码有误！");
    }

}