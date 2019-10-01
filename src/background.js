// 不知道处于何种原因background一直会报一个警告，而我也没办法通过popup来调用background中的方法
import { translate } from './translate'


chrome.contextMenus.create({
  title: "翻译:%s",
  id: '1',
  contexts: ['selection'],
  onclick: function (OnClickData) {
    let q = OnClickData.selectionText;


    // function test() {
    translate(q, function (data) {
      alert(data)
    })
    // }

    // chrome.tabs.executeScript(
    //   { code: `alert('${q}')` });

    // alert('这是一个测试')
  }
});



