!function(e){function n(n){for(var t,u,i=n[0],s=n[1],c=n[2],l=0,p=[];l<i.length;l++)u=i[l],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&p.push(o[u][0]),o[u]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t]);for(f&&f(n);p.length;)p.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var e,n=0;n<a.length;n++){for(var r=a[n],t=!0,i=1;i<r.length;i++){var s=r[i];0!==o[s]&&(t=!1)}t&&(a.splice(n--,1),e=u(u.s=r[0]))}return e}var t={},o={3:0},a=[];function u(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=e,u.c=t,u.d=function(e,n,r){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)u.d(r,t,function(n){return e[n]}.bind(null,t));return r},u.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=n,i=i.slice();for(var c=0;c<i.length;c++)n(i[c]);var f=s;a.push([15,0]),r()}({13:function(e,n,r){},15:function(e,n,r){"use strict";r.r(n);var t=r(0),o=r.n(t);r(13);var a=function(e){function n(e,n){return e<<n|e>>>32-n}function r(e,n){var r,t,o,a,u;return o=2147483648&e,a=2147483648&n,u=(1073741823&e)+(1073741823&n),(r=1073741824&e)&(t=1073741824&n)?2147483648^u^o^a:r|t?1073741824&u?3221225472^u^o^a:1073741824^u^o^a:u^o^a}function t(e,t,o,a,u,i,s){return e=r(e,r(r(function(e,n,r){return e&n|~e&r}(t,o,a),u),s)),r(n(e,i),t)}function o(e,t,o,a,u,i,s){return e=r(e,r(r(function(e,n,r){return e&r|n&~r}(t,o,a),u),s)),r(n(e,i),t)}function a(e,t,o,a,u,i,s){return e=r(e,r(r(function(e,n,r){return e^n^r}(t,o,a),u),s)),r(n(e,i),t)}function u(e,t,o,a,u,i,s){return e=r(e,r(r(function(e,n,r){return n^(e|~r)}(t,o,a),u),s)),r(n(e,i),t)}function i(e){var n,r="",t="";for(n=0;n<=3;n++)r+=(t="0"+(e>>>8*n&255).toString(16)).substr(t.length-2,2);return r}var s,c,f,l,p,d,v,g,h,C=Array();for(C=function(e){for(var n,r=e.length,t=r+8,o=16*((t-t%64)/64+1),a=Array(o-1),u=0,i=0;i<r;)u=i%4*8,a[n=(i-i%4)/4]=a[n]|e.charCodeAt(i)<<u,i++;return u=i%4*8,a[n=(i-i%4)/4]=a[n]|128<<u,a[o-2]=r<<3,a[o-1]=r>>>29,a}(e=function(e){e=e.replace(/\r\n/g,"\n");for(var n="",r=0;r<e.length;r++){var t=e.charCodeAt(r);t<128?n+=String.fromCharCode(t):t>127&&t<2048?(n+=String.fromCharCode(t>>6|192),n+=String.fromCharCode(63&t|128)):(n+=String.fromCharCode(t>>12|224),n+=String.fromCharCode(t>>6&63|128),n+=String.fromCharCode(63&t|128))}return n}(e)),d=1732584193,v=4023233417,g=2562383102,h=271733878,s=0;s<C.length;s+=16)c=d,f=v,l=g,p=h,d=t(d,v,g,h,C[s+0],7,3614090360),h=t(h,d,v,g,C[s+1],12,3905402710),g=t(g,h,d,v,C[s+2],17,606105819),v=t(v,g,h,d,C[s+3],22,3250441966),d=t(d,v,g,h,C[s+4],7,4118548399),h=t(h,d,v,g,C[s+5],12,1200080426),g=t(g,h,d,v,C[s+6],17,2821735955),v=t(v,g,h,d,C[s+7],22,4249261313),d=t(d,v,g,h,C[s+8],7,1770035416),h=t(h,d,v,g,C[s+9],12,2336552879),g=t(g,h,d,v,C[s+10],17,4294925233),v=t(v,g,h,d,C[s+11],22,2304563134),d=t(d,v,g,h,C[s+12],7,1804603682),h=t(h,d,v,g,C[s+13],12,4254626195),g=t(g,h,d,v,C[s+14],17,2792965006),d=o(d,v=t(v,g,h,d,C[s+15],22,1236535329),g,h,C[s+1],5,4129170786),h=o(h,d,v,g,C[s+6],9,3225465664),g=o(g,h,d,v,C[s+11],14,643717713),v=o(v,g,h,d,C[s+0],20,3921069994),d=o(d,v,g,h,C[s+5],5,3593408605),h=o(h,d,v,g,C[s+10],9,38016083),g=o(g,h,d,v,C[s+15],14,3634488961),v=o(v,g,h,d,C[s+4],20,3889429448),d=o(d,v,g,h,C[s+9],5,568446438),h=o(h,d,v,g,C[s+14],9,3275163606),g=o(g,h,d,v,C[s+3],14,4107603335),v=o(v,g,h,d,C[s+8],20,1163531501),d=o(d,v,g,h,C[s+13],5,2850285829),h=o(h,d,v,g,C[s+2],9,4243563512),g=o(g,h,d,v,C[s+7],14,1735328473),d=a(d,v=o(v,g,h,d,C[s+12],20,2368359562),g,h,C[s+5],4,4294588738),h=a(h,d,v,g,C[s+8],11,2272392833),g=a(g,h,d,v,C[s+11],16,1839030562),v=a(v,g,h,d,C[s+14],23,4259657740),d=a(d,v,g,h,C[s+1],4,2763975236),h=a(h,d,v,g,C[s+4],11,1272893353),g=a(g,h,d,v,C[s+7],16,4139469664),v=a(v,g,h,d,C[s+10],23,3200236656),d=a(d,v,g,h,C[s+13],4,681279174),h=a(h,d,v,g,C[s+0],11,3936430074),g=a(g,h,d,v,C[s+3],16,3572445317),v=a(v,g,h,d,C[s+6],23,76029189),d=a(d,v,g,h,C[s+9],4,3654602809),h=a(h,d,v,g,C[s+12],11,3873151461),g=a(g,h,d,v,C[s+15],16,530742520),d=u(d,v=a(v,g,h,d,C[s+2],23,3299628645),g,h,C[s+0],6,4096336452),h=u(h,d,v,g,C[s+7],10,1126891415),g=u(g,h,d,v,C[s+14],15,2878612391),v=u(v,g,h,d,C[s+5],21,4237533241),d=u(d,v,g,h,C[s+12],6,1700485571),h=u(h,d,v,g,C[s+3],10,2399980690),g=u(g,h,d,v,C[s+10],15,4293915773),v=u(v,g,h,d,C[s+1],21,2240044497),d=u(d,v,g,h,C[s+8],6,1873313359),h=u(h,d,v,g,C[s+15],10,4264355552),g=u(g,h,d,v,C[s+6],15,2734768916),v=u(v,g,h,d,C[s+13],21,1309151649),d=u(d,v,g,h,C[s+4],6,4149444226),h=u(h,d,v,g,C[s+11],10,3174756917),g=u(g,h,d,v,C[s+2],15,718787259),v=u(v,g,h,d,C[s+9],21,3951481745),d=r(d,c),v=r(v,f),g=r(g,l),h=r(h,p);return(i(d)+i(v)+i(g)+i(h)).toLowerCase()};{const e=o()(".tranCon"),n=o()(".resultBox");function u(e){console.log(e.trans_result[0].dst),n.text(e.trans_result[0].dst)}e.keyup(function(n){if(13==n.keyCode){let n=e.val();r=n,t=u,i="20190809000325312",s=(new Date).getTime(),c=r,f=/.*[\u4e00-\u9fa5]+.*$/.test(r)?"en":"zh",l=a(i+c+s+"nL8wZyhUIUDwhlXmLZIT"),o.a.ajax({url:"http://api.fanyi.baidu.com/api/trans/vip/translate",type:"get",data:{q:c,appid:i,salt:s,from:"auto",to:f,sign:l},success:function(e){t(e)}})}var r,t,i,s,c,f,l})}{const e=o()(".ACO_button"),n=o()(".ball");!function(e){for(var n=document.cookie.split("; "),r=0;r<n.length;r++){var t=n[r].split("=");if(t[0]==e)return t[1]}return""}("isOpen")?n.removeClass("open").addClass("close"):n.removeClass("close").addClass("open"),e.click(function(){var e,r;n.hasClass("open")?(n.removeClass("open").addClass("close"),e="isOpen",(r=new Date).setTime(r.getTime()-1e4),document.cookie=e+"=name; expires="+r.toGMTString(),i.removeACAO()):(n.removeClass("close").addClass("open"),function(e,n){document.cookie=e+"="+n}("isOpen","1"),i.addACAO())})}var i=chrome.extension.getBackgroundPage();i.test("这是在popup页面中输入的东西")}});