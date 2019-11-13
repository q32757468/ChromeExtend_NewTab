// 不知道处于何种原因background一直会报一个警告，而我也没办法通过popup来调用background中的方法
// import { translate } from './translate'


chrome.contextMenus.create({
  title: "翻译:%s",
  id: '1',
  contexts: ['selection'],
});


chrome.contextMenus.create({
  title: "百度翻译",
  id: '1.1',
  parentId: '1',
  contexts: ['selection'],
  onclick: function (params) {
    chrome.tabs.create({ url: `https://fanyi.baidu.com/translate?#en/zh/` + encodeURI(params.selectionText) });
  }
});

chrome.contextMenus.create({
  title: "谷歌翻译",
  id: '1.2',
  parentId: '1',
  contexts: ['selection'],
  onclick: function (params) {
    chrome.tabs.create({ url: `https://translate.google.cn/#view=home&op=translate&sl=auto&tl=${whichLang(params.selectionText)}&text=` + encodeURI(params.selectionText) });
  }
});


function whichLang(str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return 'en'
  }
  else {
    return 'zh-CN'
  }
}

const testNum = 123;

window.test = function () {
  console.log("这是一个测试");
  return testNum;
}