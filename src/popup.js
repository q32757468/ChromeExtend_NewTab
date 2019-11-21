import $ from 'jquery'
import './popup.scss'
import { translate } from './translate'


var bg = chrome.extension.getBackgroundPage();
bg.test("这是在popup页面中输入的东西");


//翻译功能
{
  const tranCon = $('.tranCon');
  const resultBox = $('.resultBox');

  //这里要注意遇到的几个坑
  //一个就是因为Ajax和事件都是异步的，并且从结果来看不论怎么样的去调用函数按键事件都拿不到Ajax的值
  //最终的解决办法是通过改写Ajax的函数，使其在接收一个函数作为参数，在Ajax中调用这个函数来对返回的数据进行处理

  tranCon.on("input", function (e) {
    let searchText = tranCon.val();
    translate(searchText, addToBoxDebounce);
  })

  const addToBoxDebounce = debounce(addToBox, 1000);
  function addToBox(res) {
    if (res.trans_result[0].dst) {
      console.log(res);
      resultBox.text(res.trans_result[0].dst);
    }
  }
}

function debounce(func, wait) {
  let timer;
  return function (res) {
    clearTimeout(timer);
    timer = setTimeout(func, wait, res);
  };
}

//开启跨域功能
{
  const ACO_button = $('.ACO_button');
  const ball = $('.ball');
  if (getCookie("isOpen")) {
    ball.removeClass('close').addClass('open');
  }
  else {
    ball.removeClass('open').addClass('close');
  }

  ACO_button.click(function () {
    //由开启切换为关闭状态
    if (ball.hasClass("open")) {
      ball.removeClass('open').addClass('close');
      deleteCookie("isOpen");
      bg.removeACAO();
    }
    //由关闭切换为开启状态
    else {
      ball.removeClass('close').addClass('open');
      setCookie("isOpen", '1')
      bg.addACAO();

    }
  })


  function setCookie(name, val) {
    document.cookie = name + "=" + val;
  }

  function getCookie(name) {
    var strcookie = document.cookie; //获取cookie字符串
    var arrcookie = strcookie.split("; "); //分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name) {
        return arr[1];
      }
    }
    return "";
  }

  function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=name; expires=" + date.toGMTString();
  }
}




