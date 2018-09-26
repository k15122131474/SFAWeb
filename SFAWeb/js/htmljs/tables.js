/**
 * Created by zqj on 2018/9/26.
 */
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