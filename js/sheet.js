(function(n){
    "use strict";
    if(!n.l){
        n.l=function(){
        }
    }
    var o=loadCSS.t={
    };
    o.o=function(){
        var l;
        try{
            l=n.document.createElement("link").relList.supports("preload")
        }
        catch(e){
            l=false
        }
        return function(){
            return l
        }
    }
    ();
    o.i=function(e){
        var l=e.media||"all";
        function enableStylesheet(){
            if(e.addEventListener){
                e.removeEventListener("load",enableStylesheet)
            }
            else if(e.attachEvent){
                e.detachEvent("onload",enableStylesheet)
            }
            e.setAttribute("onload",null);
            e.media=l
        }
        if(e.addEventListener){
            e.addEventListener("load",enableStylesheet)
        }
        else if(e.attachEvent){
            e.attachEvent("onload",enableStylesheet)
        }
        setTimeout(function(){
            e.rel="stylesheet";
            e.media="only x"
        });
        setTimeout(enableStylesheet,3e3)
    };
    o.s=function(){
        if(o.o()){
            return
        }
        var e=n.document.getElementsByTagName("link");
        for(var l=0;
        l<e.length;
        l++){
            var t=e[l];
            if(t.rel==="preload"&&t.getAttribute("as")==="style"&&!t.getAttribute("data-loadcss")){
                t.setAttribute("data-loadcss",true);
                o.i(t)
            }
        }
    };
    if(!o.o()){
        o.s();
        var e=n.setInterval(o.s,500);
        if(n.addEventListener){
            n.addEventListener("load",function(){
                o.s();
                n.clearInterval(e)
            }
            )
        }
        else if(n.attachEvent){
            n.attachEvent("onload",function(){
                o.s();
                n.clearInterval(e)
            }
            )
        }
    }
    if(typeof exports!=="undefined"){
        exports.l=loadCSS
    }
    else{
        n.l=loadCSS
    }
}
)(typeof global!=="undefined"?global:this);