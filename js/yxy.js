; (function (w, u) {

  function Yxy() {
    // this.name = 'xixixi' // no use
    // this.i = 0 // no use,xixixi

    this.cur_videos = new Array() //缓存单前的视频
    this.speed = 0 //缓存速度

    this.my_status = MY_STATUS_OPEN //正常
  }


  /**
   * 自动播放(主功能)
   */
  Yxy.prototype.autoplay = function () {

    //查看对象状态
    if (this.my_status === MY_STATUS_STOP) {
      //停止状态
      return
    }

    var $videos = $("video");
    var videoLen = $videos.size();
    this.speed = get_speed_input_val()

    if (videoLen) {
      $videos.get(0).play();

      change_tips_status(true)
      set_tips_input('自动运行中...速度' + this.speed + 'x')
    } else {
      // 没有视频，直接下一个
      this.nextVideoFromText(true, null, 0)
    }

    if (this.cur_videos.length > 0) {
      this.cur_videos = new Array()
    }

    that = this
    $videos.each(function (i, video) {
      // i->key
      that.cur_videos[i] = video

      // 解绑
      video.onended = null
      video.onplay = null

      console.log("绑定视频事件！", i)

      video.onended = function (e) {
        handler_next_video(i, videoLen, $videos, that)
      }

      // video.onplay = that.handler_play_video
      video.onplay = function (e) {
        console.log('事件')
        handler_play_video(that)
      }

    });
  }

  /**
   * 填充答案（无效）
   */
  Yxy.prototype.fill_blanks = function () {
    var ansarr = [];
    var idList = [];
    var re = [];
    $(".blank-input").each(function (k, v) {
      var id = $(v)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .attr("id");
      id = id.replace("question", "");
      idList.push(id);
    });
    idList = removeDuplicatedItem(idList);
    // console.log(idList);
    $(idList).each(function (k, id) {
      $.ajax({
        async: false,
        type: "get",
        url: URL_UAPI + id,
        datatype: "json",
        success: function (result) {
          re.push(result.correctAnswerList);
        }
      });
    });
    console.log(re);

    $(re).each(function (k1, v1) {
      if (v1.length == 1) {
        ansarr.push(v1[0]);
      } else {
        $(v1).each(function (k2, v2) {
          ansarr.push(v2);
        });
      }
    });
    // console.log(ansarr);
    $(".blank-input").each(function (k, v) {
      console.log(v);
      $(v).val(ansarr.shift());
    });
  }

  /**
   * 显示答案
   */
  Yxy.prototype.show_anwser = function () {
    var sqList = [];
    var re = [];
    $(".question-wrapper").each(function (k, v) {
      var id = $(v).attr("id");
      sqList.push(id.replace("question", ""));
    });
    // console.log(sqList);
    $(sqList).each(function (k, id) {
      $.ajax({
        async: false,
        type: "get",
        url: URL_UAPI + id,
        datatype: "json",
        success: function (result) {
          re.push(result.correctAnswerList);
        }
      });
    });
    // console.log(re);
    var an = [];
    $(re).each(function (k, v) {
      an.push(v.join(","));
    });
    var t = $(".question-wrapper").find(".question-title-html");
    t.each(function (k, v) {
      // console.log(v);
      $(v).after('<span style="color:red;">答案：' + an.shift() + "</span>");
    });
  }

  /**
   * 给页面增加附着导航栏
   */
  Yxy.prototype.addStickyBar = function () {
    var body = $("body");
    var html = `
      <div style="width: 0 auto;height: 30px;position: fixed;right:10px;top: 0;z-index: 9999;">
        <div style="height: 30px;width: 100%;" id="myself_box_wraper">
          <input type="text" value="提示信..." id="tips_input" style="height: 30px;padding: 0 10px;border: none;border-radius: 2px;color: #fff;background-color: #ea5947;line-height: 30px;outline: none;margin-right:15px;">
          <button style="height: 30px;padding: 0 10px;border: none;border-radius: 2px;color: #fff;background-color: #ea5947;
        text-align: center;line-height: 30px;outline: none;margin-right:15px;" onclick="handler_req(1,yxy)">
            显示答案
          </button>
          <input type="text" id="speed-input" value="1.0" placeholder="倍速" style="width: 50px;">
          <button style="height: 30px;padding: 0 10px;border: none;border-radius: 2px;color: #fff;background-color: #ea5947;
        text-align: center;line-height: 30px;outline: none;" onclick="handler_req(2,yxy)">添加倍速</button>
          <button style="height: 30px;padding: 0 10px;border: none;border-radius: 2px;color: #fff;background-color: #ea5947;
        text-align: center;line-height: 30px;outline: none;" onclick="handler_req(3,yxy)">自动换视频</button>
        </div>
        <p>Author:Mustard</p>
      </div>
    `;
    body.prepend($(html));
    //添加运行状态信息
    add_tips_button()
  }

  /**
   * 改变视频播放速度
   */
  Yxy.prototype.quickVideo = function (speed) {
    $("video").each(function (k, v) {

      this.speed = speed
      v.playbackRate = speed;
      console.log("视频速率为 " + speed + " x");
    });
  }

  /**
   * 处理视频增速
   */
  Yxy.prototype.handler_add_speed = function () {
    let speed_input = get_speed_input_val()
    let tips_input = get_tips_input()

    if (speed_input) {
      this.quickVideo(speed_input)
      tips_input.value = '[增速成功]:' + parseInt(speed_input) + 'x速度'
    } else {
      // alert('您所给的速率无效，请重新输入')
      tips_input.value = '[增速失败]:请重试'
    }
  }

  /**
   * 跳转播放下一个视频
   */
  Yxy.prototype.nextVideo = function (go, $videos, i) {
    if (go) {
      console.log("下一个！go", go);
      $(".next-page-btn").click();
      // TODO 改为jequry.onload()
      setTimeout(() => {
        this.autoplay();
      }, TIME_JUMP_PAGE);
    } else {
      console.log("此页面还有视频");
      $videos.get(i + 1).play();
    }
  }


  /**
   * 处理视频完毕事件回调函数
   * @param {*} i 
   * @param {*} videoLen 
   * @param {*} $videos 
   * @param {*} that 
   */
  function handler_next_video(i, videoLen, $videos, that) {
    console.log("播放完成了一个视频。");
    that.nextVideo(i + 1 === videoLen, $videos, i);
  }

  /**
   * 处理播放视频事件回调函数
   * @param {Yxy对象} that 
   */
  function handler_play_video(that) {
    console.log('捕获播放事件')
    setTimeout(() => {
      let speed_input = get_speed_input_val()
      if (speed_input) {
        speed_input = parseInt(speed_input)
      } else {
        speed_input = 6
      }

      that.quickVideo(speed_input)
    }, 1000);
  }

  /**
   * 向提示框，设置提示信息
   * @param {string} val 
   */
  function set_tips_input(val) {
    let tips_input = get_tips_input()

    if (tips_input) {
      tips_input.value = val
    } else {
      // alert('您所给的速率无效，请重新输入')
      tips_input.value = '未知错误，请联系作者'
    }
  }

  function get_tips_input() {
    return $('#tips_input').length > 0 ? $('#tips_input')[0] : null
  }

  function add_tips_button() {
    let myself_box_wraper = $('#myself_box_wraper')
    if (myself_box_wraper) {
      myself_box_wraper = myself_box_wraper[0]
      span_e = document.createElement('span')
      span_e.id = 'span_e'
      span_e.style = 'background-color: red'
      span_e.innerHTML = '未运行'

      myself_box_wraper.appendChild(span_e)
    }
  }

  // for test
  // w.add_tips_button = add_tips_button
  // w.change_tips_status = change_tips_status

  function change_tips_status(flag) {
    flag = flag || false

    span_e = $('#span_e').length > 0 ? $('#span_e')[0] : null

    if (span_e) {
      span_e.style = ''

      if (flag) {
        span_e.innerHTML = '运行中...'
        span_e.style = 'background-color: green'
        return
      }
      span_e.innerHTML = '未运行'
      span_e.style = 'background-color: red'
    }
  }

  /**
   * 获取页面速度框数据
   */
  function get_speed_input_val() {
    let speed_input = $('#speed-input').length > 0 ? $('#speed-input')[0].value : ''
    return speed_input
  }

  function addSpeed5x() {
    var lastIn = $(".mejs__speed-selector-input").last();
    lastIn.val("5.00");
    lastIn.next().text("5.00x");
  }

  /**
   * 删除重复数据
   * @param {arr}} arr 
   */
  function removeDuplicatedItem(arr) {
    //去掉重复的id
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }

  /**
   * 线程睡眠
   * @param {睡眠时间}} ms 
   */
  function sleep(ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, ms);
    })
  }

  /**
   * 如果没有视频，则从文本页面跳转
   */
  Yxy.prototype.nextVideoFromText = function () {
    console.log("下一个！go");

    //准备跳入下一页
    $(".next-page-btn").click();

    //咦，跳入时发现有弹窗
    let box_next_chapter = $('.stat-page.chapter-stat').length > 0 ? $('.stat-page.chapter-stat')[0] : null
    if (box_next_chapter) {
      //有下一章节弹窗，我返回，留给轮询处理
      return
    }
    //如果还有其他意外情况，在此加入...
    //...

    //这是留在此页面的弹窗
    // 等待一会儿页面加载，我再看有没有弹窗
    sleep(TIME_WAIT_DATA).then(() => {
      //获取弹窗
      let box = $('.modal-operation')
      let button = box.length > 0 ? box[0] ? box[0].children ? box[0].children[1] : null : null : null
      if (button) {
        if (button.innerText === STRING_LEAVE) {
          button.click()
        }
      }

      //进入循环
      setTimeout(() => {
        this.autoplay();
      }, TIME_JUMP_PAGE);
    });
  }

  /**
  * 采用轮询方式，解决【中断学习】弹窗
  */
  function loop_box_click(yxy) {
    console.log('[start]:轮询检测弹窗' + new Date())

    //挂载定时器ID，方便停止
    yxy.timeID_loop_box_click = setInterval(function () {

      let pre_time = yxy.time_loop_box_click
      let cur_time = new Date().getTime()
      yxy.time_loop_box_click = cur_time

      // 1分钟打印一次log
      if ((cur_time - pre_time) > 60 * 1000) {
        console.log('[' + new Date() + ']执行窗口检测')
      }

      let btn_submit = $('.btn-submit')
      let btn_hollow = $('.btn-hollow')

      //是否出现【中断学习】弹窗
      if (btn_submit.length > 0) {
        //jequry查询到的为一个集合，拿到第一个元素
        if (btn_submit[0].innerText === STRING_CONTINU_STUDY) {
          btn_submit.click()
        }
      }

      //是否出现章节最后一页弹窗
      if (btn_hollow.length > 0) {
        btn_hollow.each(function (k, v) {
          if (v.innerText === STRING_CLOSE || v.innerText === STRING_CONTINU_CHAPTER) {
            //视频播放完毕
            // console.log(v)
            //停止脚本
            yxy.stop()
            setTimeout(() => {
              set_tips_input(STRING_ENED_TIPS)
              alert(STRING_ENED_TIPS)
            }, 1000);
          }
        })
      }
    }, TIME_LOOP_BOX_CLICK)
  }

  /**
  *	终止脚本
  */
  Yxy.prototype.stop = function () {
    //清除定时器
    if (this.timeID_loop_box_click) {
      clearInterval(this.timeID_loop_box_click)
      this.timeID_loop_box_click = null
    }
    //改变状态标志
    this.my_status = MY_STATUS_STOP
  }

  /**
   * 处理用户请求
   * @param {int} type 
   * @param {Yxy} yxy 
   */
  function handler_req(type, yxy) {
    if (!yxy) {
      return
    }

    //判断对象是否关机
    if (yxy.my_status === MY_STATUS_STOP) {
      //重新打开
      yxy.my_status = MY_STATUS_OPEN
    }

    //判断轮询弹窗是否存在
    if (!yxy.timeID_loop_box_click) {
      //重新轮询
      loop_box_click(yxy)
    }

    //匹配请求类型
    switch (type) {
      case TYPE_SHOW_REQ:
        //显示答案
        yxy.show_anwser()

        break;
      case TYPE_ADD_REQ:
        //添加倍速
        yxy.handler_add_speed()

        break;
      case TYPE_AUTO_REQ:
        //自动挂机
        yxy.autoplay()

        break;
      default:
        alert('未知请求')
        break;
    }
  }


  //暴露接口
  w.Yxy = Yxy
  w.handler_req = handler_req

})(window, undefined)

var yxy = new Yxy()
//程序入口
yxy.addStickyBar()