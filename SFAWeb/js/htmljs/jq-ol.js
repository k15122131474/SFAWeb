/**
 * Created by zqj on 2018/9/7.
 */
function ioclick(a){
    var para="<li class=\"breadcrumb-item\"><a href=\"home.html\">Home</a> <i class=\"fa fa-angle-right\"></i></li>";
    $("#ol").children().remove();
    $("#ol").append(para);
    para="";
//    var sign = a.parent().var();
    while(a.id!=="menu"){
        para=" <li class=\"breadcrumb-item\"><a href=\""+document.getElementById(a.id).childNodes[0]+"\" target=\"iframe-info\">"+ a.childNodes[0].textContent+"<i class=\"fa fa-angle-right\"></i></li>"+para;
        var id=document.getElementById(a.id).parentNode.id;
        while(id==="") {
            id=document.getElementById(a.id).parentNode.parentNode.id;
        }
        a=document.getElementById(id);
   //     var a= $(a).parent();
    }
    //var para= " <li class=\"breadcrumb-item\"><a onclick=\"setiframe(a)\">"+ a.text+"<i class=\"fa fa-angle-right\"></i></li>"
    alert(para);
    $("#ol").append(para);

}


function lodeiframe(){
    var h=document.getElementById("iframe-info");
    h.setAttribute('height',h.contentWindow.document.body.clientHeight);
}