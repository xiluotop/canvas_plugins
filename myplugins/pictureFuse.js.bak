/**
 * 图片融合效果，将多个图片融合成一个大的框架效果
 * 本插件基于 jQuery 开发使用时请引入 jQuery 环境
 */
jQuery || require('jQuery');

(function ($) {
  /**
   * 
   * @param {
   *  id: number,      // 图片融合的容器 id，必选
   *  src: Array,    // 图片资源，必选
   *  width: number,    // 容器宽度，必选
   *  height: number,   // 容器高度，可选
   * } options 
   * 
   * @notes : 根据提供的资源融合成一个大的图片，未指定容器
   *          高度时将默认设置图片的高度等于宽度。
   */
  function pictureFuse(options) {
    if (!options) {
      console.log('合成失败，请检查参数！')
    }
    var id = options.id;
    var src = options.src;
    var width = options.width;
    var height = options.height;

    if (!id || !src || !width) {
      alert('合成失败，请检查参数')
    }
    var time = +new Date();
    height = height ? height : width;
    // 清空容器内容
    $(id).html('')

    // 设置容器的宽高
    $(id).css('width', width)
    $(id).css('height', height)
    // 设置容器溢出隐藏
    $(id).css('overflow', 'hidden')

    // 根据数组资源创建图片标签添加到容器中
    var imgHtml = '';
    var imgClass = `picture-fuse${time}`;
    $.each(src, function (index, val) {
      imgHtml += `<img src=${val} class="${imgClass}" style="float:left"/>`
    })

    // 将创建的图片标签添加到容器中
    $(id).html(imgHtml)

    var picCount = $(`.${imgClass}`).length; // 图片个数
    var picTotalWidth = 0; // 图片总宽
    var picTotalHeight = 0; // 图片总高度
    $(`.${imgClass}`).each(function (index, ele) {
      Math.floor(picTotalHeight += $(ele).height())
      Math.floor(picTotalWidth += $(ele).width())
    })

    var currentSize = Math.floor(Math.pow(width * height / picCount, 0.5))

    $(`.${imgClass}`).width(currentSize);

    // 计算当前图片的宽度，算出一行有几张图
    var rowPicCount = Math.floor(width / currentSize)
    $(`.${imgClass}`).each(function (index, elem) {
      // 每第 rowCount 个图时，将其的宽度设置为当前加上剩余，高度设置为当前
      if (!((index + 1) % rowPicCount)) {
        var temp = $(elem).css('width')
        $(elem).css('width', parseInt(temp) + Math.floor(width % currentSize))
        $(elem).css('height', parseInt(temp))
        // 重新遍历当前行的图片，如果当前行图片的高度小于最后一个图片的高度，则设置该高度
        for (var rowHead = index + 1 - rowPicCount; rowHead < index + 1 && rowHead >= 0; rowHead++) {
          var fixHeight = $(elem).css('height');
          if ($(`.${imgClass}`).eq(rowHead).height() < parseInt(fixHeight)) {
            $(`.${imgClass}`).eq(rowHead).css('height', parseInt(fixHeight))
          }
        }
      }
    })
    // 算出最后一行有几个图片
    var lastColumnCount = picCount - (Math.ceil(picCount / rowPicCount) - 1) * rowPicCount;
    // 如果最后一行的图片小于每行应有的图片的个数
    if (lastColumnCount < rowPicCount) {
      // 取中间索引值
      var mid = Math.floor(lastColumnCount / 2);
      if (!mid) {
        // 说明为只剩一张图，直接设置其宽度为容器宽度
        // 获取当前图片索引
        var index = picCount - 1;
        $(`.${imgClass}`).eq(index).width(width);
      } else {
        // 如果大于等于2个，每个图片的宽度平分容器的宽度
        // 获取最后一行第一个图片的索引
        var index = picCount - lastColumnCount;
        var averageWidth = width / lastColumnCount;
        $(`.${imgClass}`).each(function (i, elem) {
          if (i >= index) {
            $(elem).width(averageWidth);
          }
        })
      }
    }

    $(`.${imgClass}`).on('load', function () {
      var randomInt = parseInt(Math.random()*100000000);
      var canvasHtml = `<canvas id="canvas_${randomInt}" class="canvas-${id.replace('#','')}" width="${$(this).width()}" height="${$(this).height()}" style="float:left;"></canvas>`;
      $(id).append(canvasHtml);
      var cxt = $(`#canvas_${randomInt}`)[0].getContext('2d');
      cxt.drawImage($(this)[0], 0, 0, $(this).width(), $(this).height());
      $(this).replaceWith($(`#canvas_${randomInt}`))

      if(!$(`.${imgClass}`).length) {
        // console.log(id,'渲染并替换完毕')
        // 创建一个大的画布
        var c_id = id.replace('#','');
        var resCanvasHtml = `<canvas id="canvas_${c_id}" width="${width}" height="${height}"></canvas>`;
        $(id).append(resCanvasHtml);
        var res_cxt = $(`#canvas_${c_id}`)[0].getContext('2d');
        var x=0,y=0;
        for(var i=0;i<parseInt(picCount/rowPicCount);i++){
          for(var j=0;j<rowPicCount;j++){
            var index = i*rowPicCount + j;
            res_cxt.drawImage($(`.canvas-${c_id}`)[index],x,y);
            x += $(`.canvas-${c_id}`).eq(index).width();
          }
          x = 0;
          y += $(`.canvas-${c_id}`).eq(index-1).height();
        }
        $(`.canvas-${c_id}`).remove();
        // 最后将 canvas 再转换成图片
        var resImg = `<img id="resImg${c_id}" width=${width} height=${height} />`
        $(id).append(resImg);
        $(`#resImg${c_id}`).attr("src",$(`#canvas_${c_id}`)[0].toDataURL("image/png"))
        $(`#canvas_${c_id}`).remove();
      }
    })

    // window.addEventListener('load', function () {
    //   var time = +new Date();
    //   $(`.${imgClass}`).each((index, elm) => {

    //   })
    //   $(`.${imgClass}`).remove();
    // })
  }

  $.extend({
    pictureFuse
  })
})(jQuery)