chrome.contextMenus.create({
  title: "翻译:%s",
  contexts: ['selection'],
  onclick: function () {
    console.log('您点击了右键菜单！');
  }
});