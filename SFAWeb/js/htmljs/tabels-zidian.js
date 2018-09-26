
window.onload=function() {// 初始化内容
    createCode();
}
function createCode(){
				var totalPage =1;//总共多少页
				var totalRecords = 1;//总共多少条
				var pageSize=4;//每页显示多少页
				loadList(1);
				function loadList(pno)
				{
				$.ajax({
					type:"post",
				    url:"http://localhost:8077/t/dic/code/list",
					dataType: "json",
					data: { 'page': pno,'size': pageSize},
					success:function(result) {
						console.log(result);
						console.log(pno);
						if (result.code=="200") {
							var count = result.data.total;
		                    var data = result.data.list;
		                    totalRecords = count;
		                    totalPage = Math.ceil(count / pageSize);
		                    var datalist="";
		                 
							$.each(data, function(i, item) {
								$("")
								datalist+='<tr>'+
									      
					            		      '<td>'+((i+1)+(4*(pno-1)))+'</td>'+
					            		      '<td>'+item.tDicCode+'</td>'+
					            		      '<td>'+item.tName+'</td>'+
					            		      '<td>'+item.tType+'</td>'+
					            		      '<td><span> <button type="button" data-toggle="modal" data-target="#myModal"  onclick="chaxundan('+item.tDicId +')"> <span class=\"glyphicon glyphicon-pencil\"></span> </button> </span> '+
					            		      '<span> <button type="button"  onclick="shanChu('+item.tDicId +')" > <span class=\"glyphicon glyphicon-trash\"></span> </button> </span>'+
					            		      '</td>'+
					            		  '</tr>';
					        });
					        
							$("#datalist1").html(datalist);
							$('.total').text(totalPage); 
							$('.count').text(count); 
							$('.M-box').pagination({
								pageCount: totalPage,
								current:pno,//当前第几页
//								jump: true,
//								coping: true,
								homePage: '首页',
								endPage: '末页',
								prevContent: '上页',
								nextContent: '下页',
								callback:PageClick
							});
						}			
					},
		            error: function (XMLHttpRequest, textStatus, errorThrown) {
							alert('网络连接异常，请重试！')
		            }
				});
				}
                //回调函数  
                PageClick = function(index){
                    $('.now').text(index.getCurrent()); 
 					loadList(index.getCurrent());//点击分页加载列表数据  */
               }
			

	
}

function submitZiDian(){
	var tDicCode=$("#t_dic_code").val();
	var tName=$("#t_name").val();
	var tType=$("#t_type").val();
	var datas={'tDicCode':tDicCode, 'tName':tName,'tType':tType};
 
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/add",
                    data:JSON.stringify(datas),
                    contentType: "application/json", 
                    dataType:"Json",
                    
//           		beforeSend:function()
//                  {
//                      $("#tip").html("<span style='color:blue'>正在处理...</span>");
//	                    return true;
//                  },
                    success:function(data)
                    {
                        alert('cehg');
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
//                  complete:function()
//                  {
//                      // $('#tips').hide();
//                  }
                });
}
function shanChu(id) {
	var datas={"id":id};
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/delete",
                    data:{"id":id},
                    //contentType: "application/json", 
                    dataType:"Json",
  
                    success:function(data)
                    {
               
                        alert('删除成功');
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                });
}
var zdID="";
function xiuGai() {
	
	var tDicCode=$("#t_dic_code").val();
	var tName=$("#t_name").val();
	var tType=$("#t_type").val();
	var datas={"tDicId":zdID,'tDicCode':tDicCode, 'tName':tName,'tType':tType};
	
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/update",
                    data:datas,
                    //contentType: "application/json", 
                    dataType:"Json",
  
                    success:function(data)
                    {
                        alert('cehg');
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                });
}

function chaxundan(id){
	var htmls='<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
	'<button id="tijiao" type="submit" class="btn btn-primary" onclick="xiuGai()"> 提交</button><span id="tip">';
	zdID=id;		                        
			                     
	$("#tijiao").html(htmls);
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/detail",
                    data:{"id":id},
                    //contentType: "application/json", 
                    dataType:"Json",
  
                    success:function(data)
                    {
                    	console.log(data.data.tDicCode);
        				$("#t_dic_code").val(data.data.tDicCode);
        				$("#t_name").val(data.data.tName);
        				$("#t_type").val(data.data.tType);
        				
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                });
}
function tianjia(){
	var htmls='<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
	'<button id="tijiao" type="submit" class="btn btn-primary" onclick="submitZiDian()"> 提交</button><span id="tip">';
			                        
			                     
	$("#tijiao").html(htmls);
	$("#t_dic_code").val("");
	$("#t_name").val("");
	$("#t_type").val("");
}
