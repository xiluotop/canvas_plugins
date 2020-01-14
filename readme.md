# Canvas Plugins 插件开发日志

## pictureFuse 图片融合

> 目标：可以使任意多的图片碎片融合成一个大的 Img 可以根据需求引入第三方插件将其导出

## dragTextToCanvas 编辑文字到画板插件开发

> 目标：可以在 canvas 画板上通过文字设定然后画到 canvas 面板上

### 20/1/14

* 添加图片合成功能的回调函数，当图片合成后可以选择使用回调函数做相应的功能
* 代码如下：

  ```javascript
  $.pictureFuse(potions,function(img){
    console.log(img); // 打印最后合成图片的 DOM 对象
  })
  ```

### 19/12/27

* 已经完成该插件的画图功能

* 示例代码如下：

  ```javascript
  $.drawTextCanvasToPic('#box', './imgs/9.jpg')
  /**
     * @param {*} id  需要操作的 dom 容器
     * @param {*} src 传入图片的一个地址自动生成一个画布可以编辑标题等内容
     * @note 该函数生成的画布 canvas 类名为 targetCanvas
     */
    function drawTextCanvasToPic(id, src)
  ```

### 19/12/23

* 实现图片合成，将多个 Img 拼成一个个 canvas 再由 canvas 拼成整个 canvas，最后使用插件将 canvas 把 word 导出

* 所需其他插件

  * FileSaver.js

  * jquery.wordexport.js

  * 示例代码如下：

    ```javaScript
    $(function () {
        $("input[type='button']").click(function (event) {
            $(".main").wordExport('word文档');
        });
    })
    ```

### 19/12/20

* 完成插件图片融合插件 pictureFuse 1.0 版本

* 插件内容如下：

    > 根据提供的资源融合成一个大的图片，未指定容器
    > 高度时将默认设置图片的高度等于宽度。

* 插件参数：

    ```javascript
    /**
    * 
    * @param {
    *  id: string,      // 图片融合的容器 id 选择器，必选
    *  src: Array,    // 图片资源，必选
    *  width: number,    // 容器宽度，必选
    *  height: number,   // 容器高度，必选
    *  picWidth: number, // 图片高度，必填
    *  picHeight: number,// 图片宽度，选填
    * } options 
    * 
    * @notes : 根据提供的资源融合成一个大的图片。
    */
    function pictureFuse(options)
    ```

* 实例代码：

    ```HTML
    <body>
    <!-- 引入运行环境，jQuery 和 插件 js -->
    <script src="./jquery.min.js"></script>
    <script src="./pictureFuse.js"></script>
    <!-- 创建容器 -->
    <div id="content"></div>
    <!-- 当点击按钮时重新改变容器大小 -->
    <button onclick="refresh()">随机设置容器宽高</button>
    <script>
        var src = [];
        for (var i = 0; i < 20; i++) {
          src[i] = `./imgs/1.jpg`
        }

        Math.randomEx = function (lower, upper) {
          let choice = upper - lower + 1;
          return Math.floor(Math.random() * choice + lower)
        }
        let width = Math.randomEx(4096, 4096)
        let height = Math.randomEx(2160, 2160)
        $.pictureFuse({
          id: '#content',
          src,
          width: 1920 * 5,
          height: 1200 * 4,
          picWidth: 1920,
          picHeight: 1200,
        })
    </script>
    </body>
    ```

### 19/12/19

* jQuery 插件扩展方式

  ```JavaScript
  $.extend({
    pictureFuse
  })
  ```
