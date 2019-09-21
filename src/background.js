// 不知道处于何种原因background一直会报一个警告，而我也没办法通过popup来调用background中的方法

chrome.contextMenus.create({
  title: "翻译:%s",
  contexts: ['selection'],
  onclick: function () {
    console.log('您点击了右键菜单！');
  }
});

let ACAO = function (flag) {
  let modifyFieldName = 'Access-Control-Allow-Origin';
  let str = '';
  if (flag) {
    str = '*';
  }
  console.log(flag);
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    let responseHeaders = details.responseHeaders;
    let allowOriginHeader = responseHeaders.find(function (rh, index) {
      if (rh.name === modifyFieldName) {
        responseHeaders[index]['value'] = str;
        return true;
      }
    });
    if (!allowOriginHeader) {
      responseHeaders.push({
        name: modifyFieldName,
        value: str
      });
    }
    return {
      responseHeaders: responseHeaders
    };
  },
    {
      urls: ["<all_urls>"]
    },
    ["responseHeaders", "blocking"]);

}


function test() {
  console.log('这是背景的方法');
}
