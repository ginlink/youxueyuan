// let p_e=document.createElement('p')
// p_e.innerHTML='hahahhahahahahhaaahhahhahahahajajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
// document.body.appendChild(p_e)

let a_e = document.createElement('a')
let button_e = document.createElement('button')
let p_tips_e = document.createElement('p')
//包裹按钮
let div_e = document.createElement('div')
//包裹提示
let div_tips_e = document.createElement('div')

URL_UHOME = 'https://www.ulearning.cn/ulearning/index.html#/index/portal' //优学院官网
USE_TIPS = '使用提示：打开优学院官网=> 登录=> 课件 =>继续学习，进入后会发现网页顶部多了几个按钮，设置好喜欢的倍速，点击自动换视频即可。如果未发现按钮，刷新一下即可看见' //使用提示

a_e.href = URL_UHOME
a_e.onclick = handler_a_click
// a_e.innerText = '优学院官网'


button_e.innerText = '优学院官网'
p_tips_e.innerText = USE_TIPS

//样式
div_e.style = ''
a_e.style = ''
button_e.style = ''

a_e.appendChild(button_e)
div_e.appendChild(a_e)
document.body.appendChild(div_e)

div_tips_e.appendChild(p_tips_e)
document.body.appendChild(div_tips_e)

function handler_a_click(e) {
  //打开网页
  let url = URL_UHOME
  chrome.tabs.create({ url: url }, function (tabs) { });

}