// 不知道处于何种原因background一直会报一个警告，而我也没办法通过popup来调用background中的方法

chrome.contextMenus.create({
  title: "翻译:%s",
  id: 1,
  contexts: ['selection'],
  onclick: function () {
    console.log('您点击了右键菜单！');
  }
});

function test() {
  alert('我是background');
}