  var usa = $.cookie('mycookie');//获取cookie
  if(usa == null || usa == '' || usa == 'null'){//判定cooker是否为空;
     $.cookie('mycookie', null,{path:"/"});
      window.location.href="../html/index.html";
 }