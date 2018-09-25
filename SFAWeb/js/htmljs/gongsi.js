
$(function() {// 初始化内容
    createCode();
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
     $('#username').bind('input propertychange', function() {
     var s=$(this).val();
     		var totalPage =1;//总共多少页
				var totalRecords = 1;//总共多少条
				var pageSize=4;//每页显示多少页
				loadList(1);
				function loadList(pno)
				{
				$.ajax({
					type:"post",
				    url:"http://localhost:8077/t/company/list",
					dataType: "json",
					data: { 'page': pno,'size': pageSize,'s':s},
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
					            		      '<td>'+item.tComName+'</td>'+
					            		      '<td>'+item.tOrgCode+'</td>'+
					            		      '<td>'+item.tAddress+'</td>'+
					            		      '<td>'+item.tZhuceriqi+'</td>'+
					            		      '<td>'+item.tZhuciziben+'</td>'+
					            		      '<td>'+item.tFaren+'</td>'+
					            		      '<td><span> <button type="button" class="btn btn-danger glyphicon glyphicon-minus" onclick="shanChu('+item.tComId +')"> 删除 </button> </span> '+
					            		      '<span> <button type="button" class="btn btn-warning glyphicon glyphicon-edit" data-toggle="modal" data-target="#myModal" onclick="chaxundan('+item.tComId +')" > 修改 </button> </span>'+
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
		})


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
				    url:"http://localhost:8077/t/company/list",
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
					            		      '<td>'+item.tComName+'</td>'+
					            		      '<td>'+item.tOrgCode+'</td>'+
					            		      '<td>'+item.tAddress+'</td>'+
					            		      '<td>'+item.tZhuceriqi+'</td>'+
					            		      '<td>'+item.tZhuciziben+'</td>'+
					            		      '<td>'+item.tFaren+'</td>'+
					            		      '<td><span> <button type="button" class="btn btn-danger glyphicon glyphicon-minus" onclick="shanChu('+item.tComId +')"> 删除 </button> </span> '+
					            		      '<span> <button type="button" class="btn btn-warning glyphicon glyphicon-edit" data-toggle="modal" data-target="#myModal" onclick="chaxundan('+item.tComId +')" > 修改 </button> </span>'+
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
	var tComName=$("#t_com_name").val();
	var tOrgCode=$("#t_org_code").val();
	var tAddress=$("#t_address").val();
	var tZhuceriqi=$("#t_zhuceriqi").val();
	var tZhuciziben=$("#t_zhuciziben").val();
	var tFaren=$("#t_faren").val();
	var datas={'tComName':tComName, 'tOrgCode':tOrgCode,'tAddress':tAddress,'tZhuceriqi':tZhuceriqi,'tFaren':tFaren,'tZhuciziben':tZhuciziben,};
 
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/company/add",
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
                    url: "http://localhost:8077/t/company/delete",
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
	var tComName=$("#t_com_name").val();
	var tOrgCode=$("#t_org_code").val();
	var tAddress=$("#t_address").val();
	var tZhuceriqi=$("#t_zhuceriqi").val();
	var tZhuciziben=$("#t_zhuciziben").val();
	var tFaren=$("#t_faren").val();
	var datas={'tComId':zdID,'tComName':tComName,'tOrgCode':tOrgCode,'tAddress':tAddress,'tZhuceriqi':tZhuceriqi,'tFaren':tFaren,'tZhuciziben':tZhuciziben};
 
	
	
	
	
	$.ajax(
                {
                	type: "post",
                    url: "http://localhost:8077/t/company/update",
                    data:JSON.stringify(datas),
                    contentType: "application/json;charset=utf-8", 
                    dataType:"json",
  
                    success:function(data)
                    {
                        alert('cehg');
                        console.log(data);
                    },
                    error:function()
                    {
                        alert('请求出错');
                    }
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
                    url: "http://localhost:8077/t/company/detail",
                    data:{"id":id},
                    //contentType: "application/json", 
                    dataType:"Json",
  
                    success:function(data)
                    {
                    	console.log(data.data.tDicCode);
        				$("#t_com_name").val(data.data.tComName);
        				$("#t_org_code").val(data.data.tOrgCode);
        				$("#t_address").val(data.data.tAddress);
        				$("#t_zhuceriqi").val(data.data.tZhuceriqi);
        				$("#t_zhuciziben").val(data.data.tZhuciziben);
        				$("#t_faren").val(data.data.tFaren);
        				
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
	$("#t_com_name").val("");
	$("#t_org_code").val("");
	$("#t_address").val("");
	$("#t_zhuceriqi").val("");
	$("#t_zhuciziben").val("");
	$("#t_faren").val("");
}
