/**
 * Created by zqj on 2018/9/26.
 */
var gonsiming;
window.onload=function () {
	$('.form_date').datetimepicker({
    	format: "yyyy-mm-dd",
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
    //var username = get_cookie("username");
    var userId = get_cookie("userId");
    //chagongsi(userId);
//  if (username != "") {
//      $("#username").text(username);
//      var roles = get_cookie("userRole")
//      $("#roles").text(roles);
//      $("#headpic").attr("src","../img/headpic/"+get_cookie("userId")+".jpg");
//  }
    var role = get_cookie("userRole");
    if(role==="admin"){
//      $("#li-sysgovern").attr("hidden","hidden");
//      $("#li-com").attr("hidden","hidden");
        $('#comid').attr("hidden","hidden");
        //if(outorin==1){
        	chagongsiming(userId)
        	kehuor=1;
       // 	outin(1);
       // }else{
        	//outin(2);
       // }
      
    }
}

function chagongsiming(id){
	$.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/loan/details/getCompanyById', //配置统一的连接地址
		data:{userId:id},
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json',

        success: function (data) {
        	console.log(data);
  			gonsiming=data.data;
 			$('#incompany').val(gonsiming);
       		$('#incompany').attr("readonly","readonly");
       		$('#incompany').css("border","0");
            
        },
        error: function () {
 
            alert("后台请求失败，请重试！");

        }
    });
}
function adddetails(){
    var incompany=$("#incompany").val();
    var outcompany=$("#outcompany").val();
    var starttime=$("#starttime").val();
    var endtime=$("#endtime").val();
    var lixi=$("#lixi").val();
    var num=$("#num").val();
    var weiyue=$("#weiyue").val();
    var requestJson={
        incompany:incompany,
        outcompany:outcompany,
        starttime:starttime,
        endtime:endtime,
        lixi:lixi,
        num:num,
        weiyue:weiyue,
    }
    $.ajax({
        type: 'post',
        url: 'http://localhost:8077/t/loan/details/details', //配置统一的连接地址
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
