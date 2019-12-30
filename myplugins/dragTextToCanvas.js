/**
 * Canvas 画板上支持多拽自定义的文字到画板上，可以根据选择是否进行图片生成转储
 */
jQuery || require('jQuery');

(function ($) {

  /**
   * @param {*} id  需要操作的 dom 容器
   * @param {*} src 传入图片的一个地址自动生成一个画布可以编辑标题等内容
   * @note 该函数生成的画布 canvas 类名为 targetCanvas
   */
  function drawTextCanvasToPic(id, src) {
    if (!id || !src) {
      alert('初始化失败！')
    }
    // 画布
    var canvas = null;
    var ctx = null;

    var img = new Image();
    // 解决跨域
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = src;
    // 当图片渲染完毕后
    img.onload = function () {
      $(id).append(
        `<canvas id="targetCanvas" width=${this.width + 80} height=${this.height + 140} style="margin-top: 80px;"></canvas>`
      )

      canvas = document.getElementById('targetCanvas');
      ctx = canvas.getContext('2d');
      // 填充背景色，因为 canvas 转换 jpeg 会消除 alpha 通道导致背景变黑色
      ctx.fillStyle = "#F5F5F5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#000' // 黑色标题
      ctx.drawImage(img, 40, 80);
      // 添加三个按钮
      $(id).append(
          `<button id="btnTitle" style="position:absolute;left:${canvas.offsetLeft+canvas.width/2-40}px;top:${canvas.offsetTop+30}px;z-index:3">请输入标题</button>`
        )
        .append(
          `<button id="btnTip" style="position:absolute;left:${canvas.offsetLeft+40}px;top:${canvas.offsetTop+this.height + 96}px;z-index:3">请输入描述</button>`
        )
        .append(
          `<button id="btnTime" style="position:absolute;left:${canvas.offsetLeft-40 + this.width}px;top:${canvas.offsetTop+this.height + 96}px;z-index:3">请输入时间</button>`
        )

      // 为三个按钮添加点击产生输入框的事件
      $('#btnTitle').click(function () {
        // 创建文本框
        if ($('.editTitle').length) {
          $('.editTitle').remove();
        }
        ctx.font = 'bold 30px NSimSun';
        $(id).append(
          `<input type="text" class="editTitle" style="${this.style.cssText}"/>`
        )
        $('.editTitle')[0].focus();
        $('.editTitle').on('blur', function () {
          var text = this.value;
          if (text.trim()) {
            ctx.textAlign = 'center';
            ctx.fillText(text, canvas.width / 2, 30);
            $('#btnTitle').remove();
          }
          $(this).remove();
        })
      })
      $('#btnTip').click(function () {
        // 创建文本框
        if ($('.btnTip').length) {
          $('.btnTip').remove();
        }
        ctx.font = 'bold 14px "Microsoft YaHei"';
        $(id).append(
          `<input type="text" class="btnTip" style="${this.style.cssText}"/>`
        )
        $('.btnTip')[0].focus();
        $('.btnTip').on('blur', function () {
          var text = '描述：' + this.value;
          if (this.value.trim()) {
            ctx.textAlign = 'left';
            ctx.fillText(text, 40, img.height + 96);
            $('#btnTip').remove();
          }
          $(this).remove();
        })
      })
      $('#btnTime').click(function () {
        // 创建文本框
        if ($('.btnTime').length) {
          $('.btnTime').remove();
        }
        ctx.font = 'bold 14px "Microsoft YaHei"';
        $(id).append(
          `<input type="text" class="btnTime" style="${this.style.cssText}"/>`
        )
        $('.btnTime')[0].focus();
        $('.btnTime').on('blur', function () {
          var text = '时间：' + this.value;
          if (this.value.trim()) {
            ctx.textAlign = 'right';
            ctx.fillText(text, 40 + img.width, img.height + 96);
            $('#btnTime').remove();
          }
          $(this).remove();
        })
      })
    }
  }



  $.extend({
    drawTextCanvasToPic
  })
})(jQuery)