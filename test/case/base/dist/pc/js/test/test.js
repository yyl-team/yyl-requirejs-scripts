/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define('artTemplate',[],function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
define('wHello',[], function() {
    var wHello = {
        init: function() {
            console.log('hello init');
        }
    };
    return wHello;
});

/*
 * yyloader
 * github: https://github.com/jackness1208/yyloader
 * version: 1.1.0
 */


(function() {
    var $ = window.jQuery || window.$;
    if (!$) {
        throw new Error('yyl-loader required jquery');
    }

    // + vars
    var LOCAL_STORAGE_NAME = 'yylloader_data';
    var IS_IE = ('ActiveXObject' in window && /(msie |Trident\/.*rv:)(\d*)/i.test(navigator.userAgent) ? RegExp.$2 : false);
    var LOCAL_STORAGE_SPPORTED = window.localStorage && !IS_IE;
    var LOCATION = top.location.href;
    // 有效时长
    var EXPRIE_TIME = 30 * 60 * 1000;
    var IS_DEBUG = /nocache/.test(LOCATION);
    var NO_CACHE = /nocache/.test(LOCATION);
    // - vars

    var localData = {};
    if (LOCAL_STORAGE_SPPORTED) {
        try {
            localData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME)) || {};
        } catch (er) {}
    }

    var cache = {
        queues: [],
        readyModule: {},
        waitings: []
    };


    var TEMPLATE_START = /^<!-- \+ tpl\s*-->/;
    var TEMPLATE_END = /<!-- - tpl\s*-->$/;

    var fn = {
        rouder: function(param, done) {
            if (
                localData[param.name] &&
                localData[param.name].url == param.url &&
                TEMPLATE_START.test(localData[param.name].tpl) &&
                TEMPLATE_END.test(localData[param.name].tpl) &&
                !IS_DEBUG
            ) {
                return done(null, localData[param.name].tpl);
            } else {
                $.ajax({
                    url: param.url,
                    contentType: 'text/html;charset=UTF-8',
                    success: function(tpl) {
                        if (!TEMPLATE_START.test(tpl) || !TEMPLATE_END.test(tpl)) {
                            return done('get tpl error, {$name} tpl is incomplete'.replace('{$name}', param.name));
                        }

                        if (LOCAL_STORAGE_SPPORTED) {
                            localData[param.name] = {
                                url: param.url,
                                tpl: tpl,
                                date: new Date().getTime()
                            };
                            window.localStorage.setItem(
                                LOCAL_STORAGE_NAME,
                                JSON.stringify(localData)
                            );
                        }
                        return done(null, tpl);
                    },
                    error: function(er) {
                        return done(er);
                    }
                });
            }
        },
        addWaiting: function(name, ref, fn) {
            cache.waitings.push({
                name: name,
                ref: ref,
                fn: fn
            });
        },
        checkModuleReady: function(ref) {
            var canRun = true;
            $(ref).each(function(index, name) {
                if (!name) {
                    return;
                }
                if (!cache.readyModule[name]) {
                    canRun = false;
                    return true;
                }
            });
            return canRun;
        },
        checkWaiting: function() {
            if (cache.waitings.length) {
                for (var i = 0; i < cache.waitings.length;) {
                    if (fn.checkModuleReady(cache.waitings[i].ref)) {
                        cache.waitings.splice(i, 1)[0].fn();
                    } else {
                        i++;
                    }
                }
            }
        }
    };

    var OPTION = {
        src: null,
        id: null,
        ref: null
    };

    var yyloader = function(ctx, op, done) {
        if (typeof op == 'function') {
            done = op;
            op = {};
        }
        op = $.fn.extend(OPTION, op);
        $(ctx).each(function() {
            var $el = $(this);
            var url = op.src || $el.data('loader-src');
            var name = op.id || $el.data('loader-id');
            var ref = op.ref || $el.data('loader-ref');

            if (ref) {
                ref = ref.split(/\s*,\s*/);
            } else {
                ref = [];
            }

            var finishHandle = function(tpl) {
                try {
                    $(tpl).insertBefore($el);
                } catch (er) {
                    throw new Error([name, 'insert error', er.message].join(' '));
                }
                $el.remove();
                cache.readyModule[name] = true;
                fn.checkWaiting();
                return done && done(null);
            };
            if (!url) {
                return;
            }
            if (!name) {
                name = $el.attr('id');
            }
            fn.rouder({
                url: url,
                name: name
            }, function(err, tpl) {
                if (err) {
                    var errMsg = ['yyloader loaded error:', url, err];
                    if (done) {
                        done(errMsg);
                    }
                    throw new Error(errMsg);
                }

                if (fn.checkModuleReady(ref)) {
                    finishHandle(tpl);
                } else {
                    fn.addWaiting(name, ref, function() {
                        finishHandle(tpl);
                    });
                }
            });
        });
    };

    // 清空 loader 缓存
    yyloader.clear = function() {
        if (!LOCAL_STORAGE_SPPORTED) {
            return;
        }
        window.localStorage.setItem(LOCAL_STORAGE_NAME, '{}');
        localData = {};
    };

    // 设置 缓存有效时长
    yyloader.setExprie = function(time) {
        if (!LOCAL_STORAGE_SPPORTED) {
            return;
        }
        // 去掉过期的数据
        var needUpdate = false;
        var now = new Date().getTime();
        for (var key in localData) {
            if (
                localData.hasOwnProperty(key) &&
                now - localData[key].date > time
            ) {
                delete localData[key];
                needUpdate = true;
            }
        }
        if (needUpdate) {
            window.localStorage.setItem(
                LOCAL_STORAGE_NAME,
                JSON.stringify(localData)
            );
        }
    };

    // 获取 loader 中的 cache列表
    yyloader.cache = localData;

    yyloader.setExprie(EXPRIE_TIME);

    yyloader.onModuleReady = function(moduleid, done) {
        if (cache.readyModule[moduleid]) {
            return done && done();
        } else {
            fn.addWaiting('onModuleReady', [moduleid], done);
        }
    };

    if (NO_CACHE) {
        yyloader.clear();
    }
    window.yyloader = yyloader;

    if (typeof define != 'undefined' && define.amd) {
        define('yyloader', [], function() {
            return yyloader;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = yyloader;
    }
})();


require(['artTemplate', 'wHello', 'yyloader'], function(artTemplate, wHello, yyloader) {
    var cntEl = document.getElementById('tmplCnt');

    cntEl.innerHTML = artTemplate('tmpl', {
        url: '//yyweb.yystatic.com/pc/images/components/w-head/images/icons-head.png',
        url2: '/pc/images/test/logo-2021d0ef33.png',
        url3: '../../images/test/logo.png/123'.replace('/123', '')
    });
    wHello.init();

    yyloader('#tLoaderEl');
});
define("components/p-test/p-test.js", function(){});

