//是否为本地调试，开启时，加载本地文件
// 开启时，需要将根目录/js目录下s_popup.js复制到此js目录下
IS_DEBUG = false
// IS_DEBUG = true

// alert('hahaha')
// let p_e=document.createElement('p')
// p_e.innerHTML='hahahhahahahahhaaahhahhahahahajajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

let home = 'https://nahaohao.gitee.io/youxueyuan/'
//连接服务器popup，方便更新操作

let url=''
if (IS_DEBUG) {
  url = 'js/s_popup.js'
  injectCustomJs(url)
} else {
  url = home + 'js/s_popup.js'
  injectCustomJs(url, true)
}


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
