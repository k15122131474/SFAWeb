/*$("#file").change(function (event) {*/
var filechange=function(event){
    var files = event.target.files, file;
    if (files && files.length > 0) {
        // 获取目前上传的文件
        file = files[0];// 文件大小校验的动作
        if(file.size > 1024 * 1024 * 2) {
            alert('图片大小不能超过 2MB!');
            return false;
        }
        // 获取 window 的 URL 工具
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var imgURL = URL.createObjectURL(file);
        //用attr将img的src属性改成获得的url
        $("#img-change").attr("src",imgURL);
        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
        // URL.revokeObjectURL(imgURL);
    }
};
$('#registSubmit').on('submit', function(){
    registPost()
    event.preventDefault() //阻止form表单默认提交
})

function registPost () {
    alert(get_cookie("userId"));
    var formData=new FormData();
    formData.append("file",$("#file")[0].files[0]);
    console.log(formData);
    $.ajax({
        type:"post",
        url:"http://localhost:8077/t/win/fileName",
        dataType:"json",
        data:{userId:get_cookie("userId")},
        success:function(){},
        error:function(){}
    })
    $.ajax({
        type: "post",
        url: "http://localhost:8077/t/win/fileUpload",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        success:function (message) {
           console.log(message);
        },
        error:function(){
            alert("传输失败");
        }
    });
}