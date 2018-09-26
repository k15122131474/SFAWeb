/**
 * Created by zqj on 2018/9/14.
 */
function selectuser(){
    var td="";
    var tCname=$("#select-user-id").val();
    $.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/person/findInfoByName', //配置统一的连接地址
        data: {tCname:tCname},
        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        crossDomain: true,
//        xhrFields: {
//            withCredentials: true
//        },
        success: function (data) {
            /*$("body").mLoading("hide");*/
            /*  window.parent.hide();*/
            if (data.data != null && data.code == 200) {
                $("#tbody").children().remove();
                $.each(data.data,function(i,item){
                    td="<tr><td>"+item.tCname+"</td>"+"<td>"+item.tGender+"</td>"+"<td>"+item.tMobile+"</td>"+"<td>"+item.tEmail+"</td>"+"<td><button type=\"button\" class=\"btn btn-default\" style=\"background: none;height: 2em;text-align: center;vertical-align: top\" data-toggle=\"modal\" data-target=\"#updatamodal\" onclick='updata(this)' > <span class=\"glyphicon glyphicon-pencil\"></span> </button> <button type=\"button\" class=\"btn btn-default\" style=\"background: none;height: 2em;vertical-align: top\" onclick='deleteperson(this)'> <span class=\"glyphicon glyphicon-trash\"></span> </button></td><td hidden=\"hidden\">"+item.tPresonId+"</td></tr>"
                    $("#table").append(td);
                    td="";
                });

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
}
function unlock(){
    $("#mod-name").removeAttr("disabled");
    $("#mod-sex").removeAttr("disabled");
    $("#mod-email").removeAttr("disabled");
    $("#mod-phone").removeAttr("disabled");
}
function unlockadd(){
    $("#mod-id").removeAttr("disabled");
    $("#mod-id").val("");
    $("#mod-name").removeAttr("disabled");
    $("#mod-name").val("");
    $("#mod-sex").removeAttr("disabled");
    $("#mod-sex").val("");
    $("#mod-email").removeAttr("disabled");
    $("#mod-email").val("");
    $("#mod-phone").removeAttr("disabled");
    $("#mod-phone").val("");
    $("#pwd-div").show();
    $("#mod-pwd").val("");
    $("#sex-a").text("---选择性别---");
}
function updata(a){
    var tPersonId=a.parentNode.parentNode.childNodes[5].textContent;
    $.ajax({
            type: 'get',
            url: 'http://localhost:8077/t/person/findInfoById',
            data: {tPersonId:tPersonId},
            contentType:  'application/json;charset=utf-8',
            success:function (data){
                $("#u-mod-id").val(data.data.tUserName);
                $("#u-mod-name").val(data.data.tCname);
                $("#u-sex-a").text(data.data.tGender);
                $("#u-mod-email").val(data.data.tEmail);
                $("#u-mod-phone").val(data.data.tMobile);
                $("#u-mod-pwd").val("a4af7d89sa7");
                $("#u-role").text(data.data.tRole);
                if(data.data.tStatus=="-1")
                {
                    $("#u-status").text("锁定");
                }else{
                    $("#u-status").text("开启");
                }
                var id="<tr hidden='hidden'><td id='personId'>"+data.data.id+"</td><td id='userId'>"+data.data.tUserId+"</td>></tr>";
                $("#updataModalLabel").append(id);
            },
            error:function (){

            }
        });
    //$("#mod-id").removeAttr("disabled");
    //$("#mod-name").removeAttr("disabled");
    //$("#mod-email").removeAttr("disabled");
    //$("#mod-phone").removeAttr("disabled");
    //$("#pwd-div").show();
    //$("#mod-id").text(a.parent().parent().children().text());
}
function checksex(a) {
    $("#sex-a").text(a.textContent);
}
function uchecksex(a) {
    $("#u-sex-a").text(a.textContent);
}
function ucheckrole(a) {
    $("#u-role").text(a.textContent);
}
function ucheckstatus(a) {
    $("#u-status").text(a.textContent);
}
function addpeople(){
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//正则表达式
    var flag=true
    var tUserName=$("#mod-id").val();
    var pwd=$("#mod-pwd").val();
    var tCname=$("#mod-name").val();
    var tGender=$("#sex-a").text();
    var tEmail=$("#mod-email").val();
    var tMobile=$("#mod-phone").val();
    if(tUserName==""){
        alert("请输入用户名");
        flag=false;
    }
    if(pwd==""){
        alert("请输入密码");
        flag=false
    }
    if(tCname==""){
        alert("请输入用户姓名");
        flag=false;
    }
    if(tMobile!=""){
        if(tMobile.length!=11){
            alert("请输入正确的手机号");
            flag=false;
        }
            if(isNaN(tMobile)){
                flag=false;
                alert("请输入正确的手机号");
            }

    }
    if(tEmail!=""){
        if(reg.test(tEmail) == false ) {
            alert("请输入正确的邮箱");
            flage=false;
        }
    }
    if(tMobile==""){
        alert("请输入正确的手机号");
        flag=false;
    }
    requestJson={
        tUserName:tUserName,
        pwd:hex_md5(pwd),
        tCname:tCname,
        tGender:tGender,
        tEmail:tEmail,
        tMobile:tMobile
    }
    if(flag){
    $.ajax({
        type: 'post',
        url: 'http://localhost:8077/t/person/addUser', //配置统一的连接地址
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
                alert(data.message);
            } else {
                alert(data.message);
            }
            window.location.reload()
        },
        error: function () {
            /*$("body").mLoading("hide");*/
            /* window.parent.hide();*/
            alert("后台请求失败，请重试！");

        }
    });
    }
}
window.onload=function(){
    var td="";
    var role = get_cookie("userRole");
    if(role==="admin"){
        window.location.href="../home.html";
    }
    $.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/person/getAllPerson', //配置统一的连接地址
//        data: '',
        //设置传输到后端的数据
        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        crossDomain: true,
//        xhrFields: {
//            withCredentials: true
//        },
        success: function (data) {
            /*$("body").mLoading("hide");*/
            /*  window.parent.hide();*/
            if (data.data != null && data.code == 200) {
                $.each(data.data,function(i,item){
                    td="<tr><td>"+item.tCname+"</td>"+"<td>"+item.tGender+"</td>"+"<td>"+item.tMobile+"</td>"+"<td>"+item.tEmail+"</td>"+"<td><button type=\"button\" class=\"btn btn-default\" style=\"background: none;height: 2em;text-align: center;vertical-align: top\" data-toggle=\"modal\" data-target=\"#updatamodal\" onclick='updata(this)' > <span class=\"glyphicon glyphicon-pencil\"></span> </button> <button type=\"button\" class=\"btn btn-default\" style=\"background: none;height: 2em;vertical-align: top\" onclick='deleteperson(this)'> <span class=\"glyphicon glyphicon-trash\"></span> </button></td><td hidden=\"hidden\">"+item.tPresonId+"</td></tr>"
                    $("#table").append(td);
                    td="";
                });

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
}
function commitUpdata(){
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//正则表达式
    var flag=true
    var id=$("#personId").text();
    var tUserId=$("#userId").text();
    var tUserName=$("#u-mod-id").val();
    var pwd=$("#u-mod-pwd").val();
    var tCname=$("#u-mod-name").val();
    var tGender=$("#u-sex-a").text();
    var tEmail=$("#u-mod-email").val();
    var tMobile=$("#u-mod-phone").val();
    var tRole= $.trim($("#u-role").text());
    if(tUserName==""){
        alert("请输入用户名");
        flag=false;
    }
    if(pwd==""){
        alert("请输入密码");
        flag=false
    }
    if(tCname==""){
        alert("请输入用户姓名");
        flag=false;
    }
    if(tMobile!=""){
        if(tMobile.length!=11){
            alert("请输入正确的手机号");
            flag=false;
        }
        if(isNaN(tMobile)){
            flag=false;
            alert("请输入正确的手机号");
        }

    }
    if(tEmail!=""){
        if(reg.test(tEmail) == false ) {
            alert("请输入正确的邮箱");
            flag=false;
        }
    }
    if(tMobile==""){
        alert("请输入正确的手机号");
        flag=false;
    }
    if(pwd!="a4af7d89sa7"){
        pwd=hex_md5(pwd);
    }else{
        pwd="";
    }
    alert($("#u-status").text());
    if($.trim($("#u-status").text())==="锁定"){
        var tStatus="-1";
    }else{
        var tStatus="1";
    }
    requestJson={
        id:id,
        tUserId:tUserId,
        tUserName:tUserName,
        pwd:pwd,
        tCname:tCname,
        tGender:tGender,
        tEmail:tEmail,
        tMobile:tMobile,
        tRole:tRole,
        tStatus:tStatus
    }
    if(flag){
    $.ajax({
        type: 'post',
        url: 'http://localhost:8077/t/person/updataforpau', //配置统一的连接地址
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
                alert(data.message);
            } else {
                alert(data.message);
            }
            window.location.reload();
        },
        error: function () {
            /*$("body").mLoading("hide");*/
            /* window.parent.hide();*/
            alert("后台请求失败，请重试！");

        }
    });
    }
}
function reset(){
    var tPersonId=$("#personId").text();
    $.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/person/findInfoById',
        data: {tPersonId:tPersonId},
        contentType:  'application/json;charset=utf-8',
        success:function (data){
            $("#u-mod-id").val(data.data.tUserName);
            $("#u-mod-name").val(data.data.tCname);
            $("#u-sex-a").text(data.data.tGender);
            $("#u-mod-email").val(data.data.tEmail);
            $("#u-mod-phone").val(data.data.tMobile);
            $("#u-mod-pwd").val("a4af7d89sa7");
            $("#u-role").text(data.data.tRole);
            if(data.data.tStatus=="-1")
            {
                $("#u-status").text("锁定");
            }else{
                $("#u-status").text("开启");
            }
            var id="<tr hidden='hidden'><td id='personId'>"+data.data.id+"</td><td id='userId'>"+data.data.tUserId+"</td>></tr>";
            $("#updataModalLabel").append(id);
        },
        error:function (){

        }
    });
    //$("#mod-id").removeAttr("disabled");
    //$("#mod-name").removeAttr("disabled");
    //$("#mod-email").removeAttr("disabled");
    //$("#mod-phone").removeAttr("disabled");
    //$("#pwd-div").show();
    //$("#mod-id").text(a.parent().parent().children().text());
}
function deleteperson(a){
    var tpersonid=a.parentNode.parentNode.childNodes[5].textContent;
    $.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/person/deleteById',
        data: {tpersonid:tpersonid},
        dataType:"json",
        contentType:  'application/json;charset=utf-8',
        success:function(data){
            if (data.data != null && data.code == 200) {
                alert(data.data);
            } else {
                alert(data.message);
            }
            window.location.reload()
        },
        error:function(){
            alert("后台请求失败，请重试！");
        },
    })
}
function get_cookie(Name) {
    var search = Name + "%22%3A%22"//查询检索的值
    var returnvalue = "";//返回值
    if (document.cookie.length > 0) {
        sd = document.cookie.indexOf(search);
        if (sd!= -1) {
            sd += search.length;
            end = document.cookie.indexOf("%22%2C%22", sd);
            if (end == -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue=unescape(document.cookie.substring(sd, end))
        }
    }
    return returnvalue;
}