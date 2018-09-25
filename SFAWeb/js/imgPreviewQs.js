/*!
 依赖 jQuery 1.5.2
 (c) 2016
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    $.fn.imgPreviewQs = function(options){
        function isIE(ver){
            var b = document.createElement('b')
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
            return b.getElementsByTagName('i').length === 1;
        }

        options = $.extend( {}, $.fn.imgPreviewQs.defaults,options);
        var $this =$(this);
        $this.change(function(){
            var regex=/(.*)\.(jpg|jpeg|gif|bmp|png)$/;
            var val = $this.val();
            if(!regex.test(val)){
                alert("请选择图片");
                return false;
            }
            if(browserQs.isIE(8)){
                HanderIE789($this);
            }
            else if(window.FileReader){
                HanderFileReader($this);
            }
            else if(browserQs.isIE(9)){
                HanderIE789($this);
            }
            else if(browserQs.isIE(6)){
                HanderOther($this);
            }
            else if(browserQs.isIE(7)){
                HanderIE789($this);
            }
            else{
                $("#"+options.destID).html("浏览器不支持预览图片");
            }
        });

        function HanderFileReader($this){
            var oPreviewImg = null, oFReader = new window.FileReader(),
                rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            oFReader.onload = function (oFREvent)
            {
                $("#"+options.destID).html("<img src='"+oFREvent.target.result+"' style='width:100%;height:100%;'/>");
            };

            var aFiles = $this.get(0).files;
            if (aFiles.length === 0) { return; }
            if (!rFilter.test(aFiles[0].type)) { alert("请选择图片"); return; }
            oFReader.readAsDataURL(aFiles[0]);
        }

        function HanderIE789($this){
            $("#"+options.destID).css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src='"+getUrl($this)+"')");
        }

        function HanderOther($this){
            $("#"+options.destID).html("<img src='"+$this.val()+"' style='width:100%;height:100%;'/>");
        }

        function getUrl($this){
            $this.select();
            $this.blur();
            var imgSrc =document.selection.createRange().text;
            document.selection.empty();
            return imgSrc;
        }
    };
    $.fn.imgPreviewQs.defaults = {
        destID:""
    };
})(jQuery);