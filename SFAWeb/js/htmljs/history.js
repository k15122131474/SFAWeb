function cha(id){
	if(id==1){
		loanout();
	}else{
		loanin();
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
