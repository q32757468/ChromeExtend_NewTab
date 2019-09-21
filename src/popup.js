import $ from 'jquery'
import './popup.scss'
import { translate } from './translate'
$(function () {


  //翻译功能
  {
    const tranCon = $('.tranCon');
    const resultBox = $('.resultBox');

    //这里要注意遇到的几个坑
    //一个就是因为Ajax和事件都是异步的，并且从结果来看不论怎么样的去调用函数按键事件都拿不到Ajax的值
    //最终的解决办法是通过改写Ajax的函数，使其在接收一个函数作为参数，在Ajax中调用这个函数来对返回的数据进行处理

    tranCon.keyup(function (e) {
      if (e.keyCode == 13) {
        let searchText = tranCon.val();
        translate(searchText, addToBox);
      }
    })


    function addToBox(res) {
      console.log(res.trans_result[0].dst);
      resultBox.text(res.trans_result[0].dst);
    }
  }


  //开启跨域功能
  var bg = chrome.extension.getBackgroundPage();
  {
    let flag = false;
    // bg.test();
    const ACO_button = $('.ACO_button');
    const ball = $('.ball');
    ACO_button.click(function () {
      flag = !flag;
      if (flag) {
        ball.removeClass('close').addClass('open');
      }
      else {
        ball.removeClass('open').addClass('close');
      }
      bg.ACAO(flag);
    })


  }

})

