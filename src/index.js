import $ from 'jquery'
import './assets/font/iconfont'
import './index.scss'
import bgImg from './assets/images/bg.jpeg'
import './assets/images/strawberry.png'

$(function () {
  //当背景图片加载完毕之后再进行显示，解决会闪一下的问题
  {
    window.defaBg = bgImg;
    window.showDefBg = function () {
      let bg = new Image();
      bg.src = window.defaBg;
      bg.onload = function () {
        $('.main').css({
          'background': `url(${bg.src})`
        })
      }
    }

    window.showBg = function () {
      let bg = new Image();
      window.defaBg = localStorage.getItem('bg');
      bg.src = window.defaBg;
      bg.onload = function () {
        $('.main').css({
          'background': `url(${bg.src})`
        })
      }
    }

    if (!localStorage.getItem('bg')) {
      showDefBg();
    }
    else {
      showBg();
    }
  }


  // 搜索
  {
    // 搜索部分
    const searchInput = $('.searchInput');
    const searchTips = $('.searchTips');
    let tipItems = searchTips.children();
    let liList = ``;
    let query = searchInput.val();
    // let timer;
    let tipIndex = -1;

    //打开新的标签页输入框自动获得焦点
    setTimeout(() => {
      //功能实现的不完全，因为当打开一个新的标签页时浏览器会自动获得焦点，必须单机一下网页才能使网页获得焦点从而文本框获得焦点
      //但是这样做也能实现只要页面获得焦点那么文本框自动获得焦点
      searchInput.focus();
    }, 20);

    //按下回车进行搜索
    searchInput.keyup(function (e) {
      if (e.keyCode == 13) {
        query = $(this).val();
        toResultPage(query);
      }
    })

    // 提示部分
    searchInput.on('input', function () {
      tipIndex = -1;
      let query = searchInput.val();
      let url = "https://suggestion.baidu.com/su?wd=" + query + "&ie=UTF-8&cb=";
      $.ajax({
        // 发送请求之前必须要对请求地址进行处理
        url: encodeURI(url),
        type: 'get',
        // 这里不能设置datatype为json或者是jsonp
        // dataType: 'jsonp',   //如果设置为jsonp会使其变为jsonp的请求
        // dataType: 'json',    //如果设置为json则会因为其返回的数据并非标准json而报错
        success: function (data) {
          // 因为是将原本的jsonp的数据是带一对括号的，所以这里需要将拿到的字符串转化为对象
          data = (new Function("return " + data))();
          if (data.s.length >= 7) {
            data.s.length = 7;
          }
          data.s.forEach(item => {
            if (item.indexOf(query) == 0) {
              item = item.substr(0, query.length) + '<b>' + item.substr(query.length) + '</b>';
            }
            liList += `<li>${item}</li>`;
          });
          searchTips.html(liList);
          liList = ``;
          tipItems = searchTips.children();

          // 单击提示进行搜索
          tipItems.each((index, item) => {
            $(item).mousedown(function () {
              const kw = $(this).text();
              // window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${$(this).text()}`);
              toResultPage(kw);
            })
          })



          // 鼠标经过时的变化
          tipItems.each((index, item) => {
            $(item).hover(function () {
              searchTips.show();
              $(this).addClass('tipCur').siblings().removeClass('tipCur');
            }, function () {
              $(this).removeClass
                ('tipCur').siblings().removeClass('tipCur');
            })
          })

          // 搜索框失去焦点时隐藏，获得焦点时显示
          searchInput.blur(function () {
            searchTips.hide();
          })
          searchInput.focus(function () {
            searchTips.show();
          })

        }
      })
    })


    //跳转到搜索界面
    function toResultPage(keyWord) {
      const activeIcon = $('.searchIconBox .active');
      const iconName = activeIcon.attr('name');
      if (iconName == 'baidu') {
        window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${keyWord}`);
      }
      else
        if (iconName == 'google') {
          window.open(`https://www.google.com/search?q=${keyWord}`);
        }
    }


    // 通过上下箭头来控制搜索框内容
    searchInput.keydown(function (e) {
      // 方向键下
      if (e.keyCode == 40) {
        tipIndex++;
        if (tipIndex >= tipItems.length) {
          tipIndex = 0;
        }
        tipItems.eq(tipIndex).addClass('tipCur').siblings().removeClass('tipCur');
        searchInput.val(tipItems.eq(tipIndex).text());
      }
      // 方向键上
      if (e.keyCode == 38) {
        // 要阻止默认行为必须使用keydown事件
        e.preventDefault();
        tipIndex--;
        if (tipIndex <= (-1)) {
          tipIndex = (tipItems.length - 1);
        }
        tipItems.eq(tipIndex).addClass('tipCur').siblings().removeClass('tipCur');
        searchInput.val(tipItems.eq(tipIndex).text());
      }
    })

    //选择搜索引擎
    function chSearch() {
      const searchIconBox = $('.searchIconBox');
      const searchList = $('.searchList');
      let flag = false;
      searchIconBox.click(function (e) {
        flag = !flag;
        if (flag) {
          searchIconBox.css({
            'overflow': 'unset'
          })
        }
        else {
          searchIconBox.css({
            'overflow': 'hidden'
          })
        }
        e.stopImmediatePropagation();
      })

      //点击其他地方的时候自动隐藏
      $(document).mouseup(function (e) {
        if (!searchIconBox.is(e.target) && searchIconBox.has(e.target).length === 0) {
          flag = false;
          searchIconBox.css({
            'overflow': 'hidden'
          })
        }
      });

      searchList.children().click(function () {
        console.log($(this));
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      })
    }
    chSearch();


  }

  // 实现快速导航列表
  {
    const quickOption = $('.quickOption');
    const quickBox = $('.quickBox');
    let blockLen;
    let scrollIndex = 0;
    let liTemplate;
    const blockWidth = $('.siteWrap').width();
    // 尝试两种方式，一种是用对象，一种是用数组

    // 数组
    let siteList = [
      { 'url': 'https://www.youku.com', 'title': '优酷', 'icon': require('./assets/siteIcons/youku.png') },
      { 'url': 'https://www.bilibili.com', 'title': 'bilibili', 'icon': require('./assets/siteIcons/bilibili.png') },
      { 'url': 'http://hemin.cn/jq/', 'title': 'jQuery中文文档', 'icon': require('./assets/siteIcons/jq.png') },
      { 'url': 'https://www.huya.com', 'title': '虎牙', 'icon': require('./assets/siteIcons/huya.png') },
      { 'url': 'https://www.iconfont.cn/', 'title': '阿里巴巴矢量图标库', 'icon': require('./assets/siteIcons/ali.png') },
      { 'url': 'https://www.douyu.com', 'title': '斗鱼', 'icon': require('./assets/siteIcons/douyu.png') },
      { 'url': 'https://www.douyu.com', 'title': '斗鱼', 'icon': require('./assets/siteIcons/douyu.png') },
      { 'url': 'https://www.douyu.com', 'title': '斗鱼', 'icon': require('./assets/siteIcons/douyu.png') },
    ]

    // 大概思路就是通过将li元素添加到ul中，然后设定一个上限，如果超过了这个上限就再新建一个ul然后向新建的这个ul中添加后续的li，超过一定数量的li再次创建ul然后继续添加
    siteList.forEach((item, index) => {
      liTemplate = `
          <li>
            <a class="quickIcon" href="${item.url}" style="background-image: url(${item.icon});"></a>
            <a class="quickTitle" href="${item.url}">${item.title}</a>
          </li>`;
      if (!(index % 10)) {
        quickBox.append(`<ul class="blcok${index / 10}"></ul>`);
        quickOption.append(`<li></li>`);//增加滑动选项
      }
      quickBox.children().last().append(liTemplate);
    });

    // 为第一个选项添加cur样式
    quickOption.children().first().addClass('optionCur');

    //获取ul块的个数
    blockLen = quickBox.children().length;

    // 为滑动选项添加鼠标滚轮控制
    function setDiff() {
      let preTime = new Date();
      $(window).on('mousewheel DOMMouseScroll', function (e) {
        let diff = (new Date()) - preTime;
        if (diff > 100) {
          e = e || window.event;
          let delta = e.originalEvent.wheelDelta || e.originalEvent.detail;  //后者Firefox
          if (delta > 0) { //当滑轮向上滚动时  
            scrollIndex--;
            if (scrollIndex >= 0) {
              quickBox.stop().animate({
                'marginLeft': scrollIndex * -blockWidth
              }, 300);
              quickOption.children().eq(scrollIndex).addClass('optionCur').siblings().removeClass('optionCur');
            } else {
              scrollIndex = 0;
            }
          }
          if (delta < 0) { //当滑轮向下滚动时  
            scrollIndex++;
            if (scrollIndex < blockLen) {
              quickBox.stop().animate({
                'marginLeft': scrollIndex * -blockWidth
              }, 300)
              quickOption.children().eq(scrollIndex).addClass('optionCur').siblings().removeClass('optionCur');
            } else {
              scrollIndex = (blockLen - 1);
            }
          }
        }
        preTime = new Date();
      });
    }
    setDiff();

    //点击选项跳转到相应的块
    quickOption.children().each((index, item) => {
      $(item).click(function () {
        quickBox.stop().animate({
          'marginLeft': index * -blockWidth
        }, 300)
        quickOption.children().eq(index).addClass('optionCur').siblings().removeClass('optionCur');
      })
    })






  }

  //实现自定义鼠标右键的菜单
  {
    const tem = `
      <ul class="contextMenu">
        <li>新增图标</li>
        <li>编辑图标</li>
        <li class="chBg">
          <input type="file">
          <p class="title">
          编辑壁纸
          </p>
        </li>
      </ul>
    `;
    $('.main').append(tem);
    const contextMenu = $('.contextMenu');
    $('.main').contextmenu(function (e) {
      // 在return false 之前可以写自己想要的功能的代码
      e = e || window.event;
      // 将菜单的位置设置为鼠标右键时的位置
      contextMenu.css({
        //通过fix绝对定位来确定菜单的位置
        'top': e.pageY + 'px',
        'left': e.pageX + 'px',
      });
      contextMenu.show();//将菜单显示出来

      //禁用了原本的鼠标右键菜单
      return false;
    })
    $(window).click(function () {
      contextMenu.hide();
    })
    // console.log(contextMenu.get(0));



  }


  //实现修改壁纸
  {
    const preBt = $('.chBg input');
    let bgUrl;
    let tmp = `
    <div class="previewBg">
      <img class="imgPreview" src="">
      <button class="comfir">确定</button>
    </div>`;
    preBt.change(function () {
      $('.bgPreBox').html(tmp);
      const previewBg = $('.previewBg')
      const imgPreview = $('.imgPreview');
      const comfir = $('.comfir');
      // previewBg.show();
      const file = $(this)[0].files[0];
      const fr = new FileReader();
      fr.onload = function () {
        imgPreview.attr({ "src": this.result });
        bgUrl = this.result;
        localStorage.setItem('bg', bgUrl)
      }
      fr.readAsDataURL(file);//将图片作为url读出提交给result

      comfir.click(function () {
        showBg();
        previewBg.hide();
      })

    })

  }


})