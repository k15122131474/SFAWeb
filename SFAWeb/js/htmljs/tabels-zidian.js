function submitZiDian(){
	var tDicCode=$("#t_dic_code").val();
	var tName=$("#t_name").val();
	var tType=$("#t_type").val();
	$.ajax(
                {
                    url: "houtailujing",
                    data:{"tDicCode":tDicCode, "tName":tName,"tType":tType},
                    type: "post",
             		beforeSend:function()
                    {
                        $("#tip").html("<span style='color:blue'>正在处理...</span>");
                        return true;
                    },
                    success:function(data)
                    {
                       if(data > 0)
                        {

                            var msg = "添加";
                            if(act == "edit") msg = "编辑";
                            $("#tip").html("<span style='color:blueviolet'>恭喜，" +msg+ "成功！</span>");
                            // document.location.href='system_notice.php'
                            alert(msg + "OK！");
                            location.reload();
                        }
                        else
                        {
                            $("#tip").html("<span style='color:red'>失败，请重试</span>");
                            alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        // $('#tips').hide();
                    }
                });
}
