var kehuor;

function cha(id){
	if(kehuor==1){
		if(id==1){
			outin(id);
		}else{
			outin(id);
		}
	}else{
		
		if(id==1){
			loanout();
		}else{
			loanin();
		}
	}
}
function loanout(){
	var name=$('#comid').val();

	$.ajax({
        type: 'post',
        url: 'http://localhost:8077/t/loan/details/loanout', //配置统一的连接地址
		data:{'tLoanoutComid':name},
        dataType: 'json',

        success: function (data) {
        	console.log(data);
  		var htmls;
            if (data.data != null && data.code == 200) {
                $.each(data.data,function(i,item){
                    htmls="<tr><td>"+item.tLoanoutComName+
                    "</td><td>"+item.tLoaninComName+
                    
                    "</td><td>"+item.tLoanStartTime+
                    "</td><td>"+item.tLoanNum+
                    "</td><td>"+item.tLoanEndTime+
                    
                    "</td><td>"+item.tWeiyueNum+
                    "</td><td>"+item.tLixi+
                    "</td><td>"+item.tChanghuanTotal+
                    "</td><td>"+item.tStatus+
                
                    "</td></tr>"
                    $("#table").append(htmls);
                    
                });

            } else {
                alert(data.message);
            }
        },
        error: function () {
 
            alert("后台请求失败，请重试！");

        }
    });
}
function loanin(){
	var name=$('#comid').val();
	var dats={'tLoaninComid':name};
	$.ajax({
        type: 'post',
        url: 'http://localhost:8077/t/loan/details/loanin', //配置统一的连接地址
		data:dats,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json',

        success: function (data) {
        	console.log(data);
  		var htmls;
            if (data.data != null && data.code == 200) {
                $.each(data.data,function(i,item){
                    htmls="<tr><td>"+item.tLoanoutComName+
                    "</td><td>"+item.tLoaninComName+
                  
                    "</td><td>"+item.tLoanStartTime+
                    "</td><td>"+item.tLoanNum+
                    "</td><td>"+item.tLoanEndTime+
                    
                    "</td><td>"+item.tWeiyueNum+
                    "</td><td>"+item.tLixi+
                    "</td><td>"+item.tChanghuanTotal+
                    "</td><td>"+item.tStatus+
                
                    "</a></td></tr>"
                    $("#table").append(htmls);
                    
                });

            } else {
                alert(data.message);
            }
        },
        error: function () {
 
            alert("后台请求失败，请重试！");

        }
    });
}

window.onload=function () {
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
        $('#comid').css("visibility","hidden");
        //if(outorin==1){
        	chagongsiming(userId)
        	kehuor=1;
       // 	outin(1);
       // }else{
        	//outin(2);
       // }
    }
}
var gonsiming;
function outin(banduan){
	var name=gonsiming;
	var src;
	var datas;
	if(banduan==1){
		src='http://localhost:8077/t/loan/details/loanout';
		datas={'tLoanoutComid':name};
	}else{
		src='http://localhost:8077/t/loan/details/loanin'
		datas={'tLoaninComid':name};
	}
	$.ajax({
        type: 'post',
        url: src, //配置统一的连接地址
		data:datas,
        dataType: 'json',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function (data) {
        	console.log(data);
  		var htmls="";
  		 
            if (data.data != null && data.code == 200) {
                $.each(data.data,function(i,item){
                    htmls="<tr><td>"+item.tLoanoutComName+
                    "</td><td>"+item.tLoaninComName+
                    
                    "</td><td>"+item.tLoanStartTime+
                    "</td><td>"+item.tLoanNum+
                    "</td><td>"+item.tLoanEndTime+
                    
                    "</td><td>"+item.tWeiyueNum+
                    "</td><td>"+item.tLixi+
                    "</td><td>"+item.tChanghuanTotal;
                    if(banduan!=1){
	                	htmls+='</td><td><a onclick="shehe('+item.tLoanId+')">'+item.tStatus+
	                    "</a></td></tr>"
                    }
                    else{
                    	htmls+="</td><td>"+item.tStatus+
	                    "</td></tr>"
                    }
                    $("#tbody").html(htmls);
                    
                });

            } else {
                alert(data.message);
            }
        },
        error: function () {
 
            alert("后台请求失败，请重试！");

        }
    });
}
function shehe(id){
	
	$.ajax({
        type: 'get',
        url: 'http://localhost:8077/t/loan/details/shenhe', //配置统一的连接地址
		data:{tLoanId:id},
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json',

        success: function (data) {
        	console.log(data);
  			alert("审核通过");
			//window.location.reload();
			outin(2);
            
        },
        error: function () {
 
            alert("后台请求失败，请重试！");

        }
    });
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

            
        },
        error: function () {
 
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
