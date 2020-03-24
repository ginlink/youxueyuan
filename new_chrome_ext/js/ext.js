// var script = document.createElement("script");
// script.src = "https://hsmus.gitee.io/youxueyuan/yxy.min.js";
// document.getElementsByTagName("head")[0].appendChild(script);

let path_0='js/settings.js'
let path_1='js/yxy.js'

// 注入JS
injectCustomJs(path_0)
injectCustomJs(path_1)


/**
 * 向页面注入JS
 * @author'url http://haoji.me
 * @param {string} jsPath 
 */
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}
