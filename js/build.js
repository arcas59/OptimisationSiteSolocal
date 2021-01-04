/* THIS FILE IS AUTO-GENERATED. SEE build/build-modernizr */
/*! modernizr 3.5.0 (Custom Build) | MIT * * https://modernizr.com/download/?-passiveeventlisteners-supports-setclasses-cssclassprefix:dm- !*/
!function(e,n,s){
    function o(e,n){
        return typeof e===n
    }
    function t(){
        var e,n,s,t,a,r,l;
        for(var c in i)if(i.hasOwnProperty(c)){
            if(e=[],n=i[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;
            s<n.options.aliases.length;
            s++)e.push(n.options.aliases[s].toLowerCase());
            for(t=o(n.fn,"function")?n.fn():n.fn,a=0;
            a<e.length;
            a++)r=e[a],l=r.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),f.push((t?"":"no-")+l.join("-"))
        }
    }
    function a(e){
        var n=l.className,s=Modernizr._config.classPrefix||"";
        if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){
            var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");
            n=n.replace(o,"$1"+s+"js$2")
        }
        Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),c?l.className.baseVal=n:l.className=n)
    }
    var i=[],r={
        _version:"3.5.0",_config:{
            classPrefix:"dm-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0
        }
        ,_q:[],on:function(e,n){
            var s=this;
            setTimeout(function(){
                n(s[e])
            }
            ,0)
        }
        ,addTest:function(e,n,s){
            i.push({
                name:e,fn:n,options:s
            }
            )
        }
        ,addAsyncTest:function(e){
            i.push({
                name:null,fn:e
            }
            )
        }
    }
    ,Modernizr=function(){
    };
    Modernizr.prototype=r,Modernizr=new Modernizr;
    var f=[],l=n.documentElement,c="svg"===l.nodeName.toLowerCase(),u="CSS"in e&&"supports"in e.CSS,p="supportsCSS"in e;
    Modernizr.addTest("supports",u||p),Modernizr.addTest("passiveeventlisteners",function(){
        var n=!1;
        try{
            var s=Object.defineProperty({
            }
            ,"passive",{
                get:function(){
                    n=!0
                }
            });
            e.addEventListener("test",null,s)
        }
        catch(o){
        }
        return n
    }
    ),t(),a(f),delete r.addTest,delete r.addAsyncTest;
    for(var d=0;
    d<Modernizr._q.length;
    d++)Modernizr._q[d]();
    e.Modernizr=Modernizr
}
(window,document);
var isWLR = true;
window.customWidgetsFunctions = {
};
window.customWidgetsStrings = {
};
window.collections = {
};