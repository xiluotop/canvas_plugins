/**
 * 图片融合效果，将多个图片融合成一个大的框架效果
 * 本插件基于 jQuery 开发使用时请引入 jQuery 环境
 */
jQuery || require('jQuery');

(function ($) {
  /**
   * 
   * @param {
   *  id: number,       图片融合的容器 id，必选
   *  src: Array,       图片资源，必选
   *  width: number,    容器宽度，必选
   *  height: number,   容器高度，必填
   *  picWidth: number, 图片高度，必填
   *  picHeight: number,图片宽度，选填
   * } options 
   * @param {Function} callback 回调函数，传入的参数是合成后的 img DOM 对象
   * 
   * @notes : 根据提供的资源融合成一个大的图片
   */
  function pictureFuse(options,callback) {
    if (!options) {
      console.log('合成失败，请检查参数！')
    }
    var id = options.id;
    var src = options.src;
    var width = options.width;
    var height = options.height;
    var picWidth = options.picWidth;
    var picHeight = options.picHeight;

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
        for(var i=0;i<parseInt(src.length/(width/picWidth));i++){
          for(var j=0;j<(width/picWidth);j++){
            var index = i*(width/picWidth) + j;
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
        callback && callback($(`#resImg${c_id}`)[0]);
      }
    })
  }

  $.extend({
    pictureFuse
  })
})(jQuery)