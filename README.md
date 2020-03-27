## 觉得好用就给我个 star 呗

https://github.com/hsmustard/youxueyuan ##本脚本的功能：
@author Mustard

- 全自动刷视频（跳过题目和文字页面）
- 可手动查阅答案
## 使用方法

#### 方法一（推荐）：长期使用，没有大的更新无需再次加载（小更新则远端自动更新）
[推荐] 360浏览器和QQ浏览器，直接将插件文件拖入浏览器窗口即可。（[点击下载插件][6]）

其他浏览器加载插件方法教程[点击这里查看加载教程][2]（[点击下载插件压缩包][7]）

加载完毕，点击插件即可看到下一步使用引导。


#### 方法二：***零时使用***，手动添加代码方式

***首先***正常登陆优学院=> 课件 => 继续学习

之后进入 ** 开发者工具（按一下键盘 F12 键） ** 的浏览器
在 ** console ** 粘贴以下内容：

```javascript
var script1 = document.createElement("script");
var script2 = document.createElement("script");
script1.src = "https://nahaohao.gitee.io/youxueyuan/js/settings.js";
script2.src = "https://nahaohao.gitee.io/youxueyuan/js/yxy.js";
document.getElementsByTagName("head")[0].appendChild(script1);
document.getElementsByTagName("head")[0].appendChild(script2);
```

然后回车即可

![开发者工具][3]

## 老版本 Chrome 插件

@author FuckSky.
![插件预览][4]
下载地址：
[Chrome 插件][5]

[1]: https://github.com/hsmustard/youxueyuan/releases/download/chrome_ext/new_chrome_ext.zip
[2]: https://blog.csdn.net/yshenhua/article/details/80901677
[3]: https://hsmus.top/usr/uploads/2019/04/476501903.png
[4]: https://hsmus.top/usr/uploads/2019/04/2080446546.png
[5]: https://hsmustard.github.io/youxueyuan/chrome/fuckyxy.crx
[6]: https://www.lanzous.com/iaoyxde
[7]: https://www.lanzous.com/iaoyxhi
