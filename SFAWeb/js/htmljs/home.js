




$(document).ready(function() {
    //BOX BUTTON SHOW AND CLOSE
    jQuery('.small-graph-box').hover(function() {
        jQuery(this).find('.box-button').fadeIn('fast');
    }, function() {
        jQuery(this).find('.box-button').fadeOut('fast');
    });
    jQuery('.small-graph-box .box-close').click(function() {
        jQuery(this).closest('.small-graph-box').fadeOut(200);
        return false;
    });

    //CHARTS
    function gd(year, day, month) {
        return new Date(year, month - 1, day).getTime();
    }

    /*graphArea2 = Morris.Area({
     element: 'hero-area',
     padding: 10,
     behaveLikeLine: true,
     gridEnabled: false,
     gridLineColor: '#dddddd',
     axes: true,
     resize: true,
     smooth:true,
     pointSize: 0,
     lineWidth: 0,
     fillOpacity:0.85,
     data: [
     {period: '2014 Q1', iphone: 2668, ipad: null, itouch: 2649},
     {period: '2014 Q2', iphone: 15780, ipad: 13799, itouch: 12051},
     {period: '2014 Q3', iphone: 12920, ipad: 10975, itouch: 9910},
     {period: '2014 Q4', iphone: 8770, ipad: 6600, itouch: 6695},
     {period: '2015 Q1', iphone: 10820, ipad: 10924, itouch: 12300},
     {period: '2015 Q2', iphone: 9680, ipad: 9010, itouch: 7891},
     {period: '2015 Q3', iphone: 4830, ipad: 3805, itouch: 1598},
     {period: '2015 Q4', iphone: 15083, ipad: 8977, itouch: 5185},
     {period: '2016 Q1', iphone: 10697, ipad: 4470, itouch: 2038},
     {period: '2016 Q2', iphone: 8442, ipad: 5723, itouch: 1801}
     ],
     lineColors:['#ff4a43','#a2d200','#22beef'],
     xkey: 'period',
     redraw: true,
     ykeys: ['iphone', 'ipad', 'itouch'],
     labels: ['All Visitors', 'Returning Visitors', 'Unique Visitors'],
     pointSize: 2,
     hideHover: 'auto',
     resize: true
     });*/


});
function logout(){
    var id=get_cookie("userId");
    var requestJson = {
        "id":id
    };
    $.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/sys/user/userLogout', //配置统一的连接地址
        data: requestJson,
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
                alert(data.message);
                window.location.href="index.html";
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


window.onload=function () {
    var username = get_cookie("username");
    if (username != "") {
        $("#username").text(username);
        var roles = get_cookie("userRole")
        $("#roles").text(roles);
        if(roles=="systemstrator"||roles=="strator"){
            $("#setrole").attr("href","other/usergovern.html");
        }
        $("#headpic").attr("src","../img/headpic/"+get_cookie("userId")+".jpg");
    }
}
