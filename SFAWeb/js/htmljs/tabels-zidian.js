
$(function() {// 初始化内容
    createCode();
});
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
									      
					            		      '<td>'+(i+1)+'</td>'+
					            		      '<td>'+item.tDicCode+'</td>'+
					            		      '<td>'+item.tName+'</td>'+
					            		      '<td>'+item.tType+'</td>'+
					            		      '<td><span> <button type="button" class="btn btn-danger glyphicon glyphicon-minus" onclick="shanChu('+item.tDicId +')"> 删除 </button> </span> '+
					            		      '<span> <button type="button" class="btn btn-warning glyphicon glyphicon-edit onclick="xiuGai('+item.tDicId +')" > 修改 </button> </span>'+
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
function shanChu(id) () {
	var datas={"tDicId":id};
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/delete",
                    data:JSON.stringify(datas),
                    contentType: "application/json", 
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
function xiuGai(id) () {
	
	
	var datas={"tDicId":id};
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/dic/code/update",
                    data:JSON.stringify(datas),
                    contentType: "application/json", 
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