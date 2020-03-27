// var script = document.createElement("script");
// script.src = "https://hsmus.gitee.io/youxueyuan/yxy.min.js";
// document.getElementsByTagName("head")[0].appendChild(script);

//是否为本地调试，开启时，加载本地文件
// 开启时，需要将根目录/js目录下settings.js和yxy.js复制到此js目录下
// 修改完毕，再复制回去，哈哈哈，再git push
IS_DEBUG = false
// IS_DEBUG = true

let home = 'https://nahaohao.gitee.io/youxueyuan/'
//远程代码，方便更新
let path_0 = ''
let path_1 = ''
let is_remote = false

if (IS_DEBUG) {
	path_0 = 'js/settings.js'
	path_1 = 'js/yxy.js'
} else {
	path_0 = home + 'js/settings.js'
	path_1 = home + 'js/yxy.js'
	is_remote = true //远端脚本
}

// 注入JS
injectCustomJs(path_0, is_remote)
// 注入间隔，让setting.js完全加载
setTimeout(() => {
	injectCustomJs(path_1, is_remote)
}, 500);


/**
 * 向页面头部注入JS
 * @author'url http://haoji.me
 * @param {string} jsPath 
 * @param {bool} reomte 是否为远端js
 */
function injectCustomJs(jsPath, reomte = false) {
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	if (!reomte) {
		temp.src = chrome.extension.getURL(jsPath);
	} else {
		temp.src = jsPath
	}

	// temp.onload = function () {
	// 	// 放在页面不好看，执行完后移除掉
	// 	this.parentNode.removeChild(this);
	// };
	document.head.appendChild(temp);
}
