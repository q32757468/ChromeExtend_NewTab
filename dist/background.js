!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}({14:function(e,t){function n(e){return/.*[\u4e00-\u9fa5]+.*$/.test(e)?"en":"zh-CN"}function o(e){var t=e.responseHeaders;return t.find(function(e,n){if("Access-Control-Allow-Origin"===e.name)return t[n].value="*",!0})||t.push({name:"Access-Control-Allow-Origin",value:"*"}),{responseHeaders:t}}chrome.contextMenus.create({title:"翻译:%s",id:"1",contexts:["selection"]}),chrome.contextMenus.create({title:"百度翻译",id:"1.1",parentId:"1",contexts:["selection"],onclick:function(e){chrome.tabs.create({url:"https://fanyi.baidu.com/translate?#en/zh/"+encodeURI(e.selectionText)})}}),chrome.contextMenus.create({title:"谷歌翻译",id:"1.2",parentId:"1",contexts:["selection"],onclick:function(e){chrome.tabs.create({url:`https://translate.google.cn/#view=home&op=translate&sl=auto&tl=${n(e.selectionText)}&text=`+encodeURI(e.selectionText)})}}),window.test=function(e){console.log("这是一个测试"),console.log(e)},window.addACAO=function(){chrome.webRequest.onHeadersReceived.addListener(o,{urls:["<all_urls>"]},["responseHeaders","blocking"]),console.log("跨域功能开启了")},window.removeACAO=function(){chrome.webRequest.onHeadersReceived.removeListener(o),console.log("跨域功能关闭了")}}});