var thisIndex = 0; // 所处页面
let contractUrl = ''
// let targetDate = new Date(Date.now() + 5000)
let targetDate = new Date(1597492800000)
let countDownTime = 0
let raiseInfo = document.querySelector('.raise-info')
let awardInfo = document.querySelector('.award-info')
let countInfo = document.querySelector('.count-info')
let rateInfo = document.querySelector('.rate-info')
let step2Interval = null
let lastUserTime = 0
let qrcode = null
function transformThou (num) {
  num = num + ''
  return num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
}

function updateInfo (data) {
  countInfo.innerText = transformThou(data.tokencount)
  rateInfo.innerText = data.layerexchangerate
  raiseInfo.innerText = transformThou(data.amountraised)
  lastUserTime = data.lastusertime * 1000
  if (data.layer >= 42) {
    awardInfo.innerText = Number((data.amountraised * 0.05).toFixed(4))
  }
  if (!step2Interval && data.layer >= 42) {
    document.querySelector('.blur').classList.remove('blur')
    step2Interval = setInterval(updateStep2Content, 1000)
  }
}
function getInfo () {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://47.75.58.153:8088/getsysteminfo', false)
  xhr.onreadystatechange = function () {
    // readyState == 4说明请求已完成
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText)
        console.log(data)
        if (data.code === 200) {
          data = data.data
          if (data.contractaddress !== contractUrl) {
            contractUrl = data.contractaddress
            let hash = document.querySelector('#hash')
            hash.innerText = contractUrl
            document.querySelector('#qrcode').innerHTML = ''
            if(!qrcode){
              qrcode = new QRCode('qrcode')
            }
            qrcode.makeCode(contractUrl)
          }
          updateInfo(data)
        }
      }
    }
  }
  xhr.send()
}
new fullpage('#fullpage', {
  anchors: [
    'interval',
    'homepage',
    'mensaprotocol',
    'mensaearn',
    'token',
    'partner',
    'joinus'
  ],
  // sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
  responsiveHeight: 410,
  // navigation: true,
  // navigationTooltips: ['fullPage', 'Open', 'Easy', 'Touch'],
  afterLoad: function (origin, destination, direction) {
    // console.log('回调页面',origin)
    thisIndex = origin.index
    changeState()
  }
})
var daojishi = null
var padTime = null
var middle = document.querySelector('#productfather')
var middleSecond = document.querySelector('#padfather')
var closeIcon = document.querySelector('.arrow-down')
var openIcon = document.querySelector('.arrow-up')
middle.addEventListener('mouseover', hoverEvent)
middle.addEventListener('onclick', hoverEvent)
middle.addEventListener('mouseout', hoverEventTwo)
middleSecond.addEventListener('mouseover', hoverEvents)
middleSecond.addEventListener('mouseout', levelEvent)

function hoverEvent () {
  if (daojishi) {
    clearTimeout(daojishi)
    daojishi = null
  }
  document.querySelector('.list-menu').style.display = 'block'
}

function hoverEventTwo () {
  daojishi = setTimeout(() => {
    document.querySelector('.list-menu').style.display = 'none'
  }, 400)
}

function hoverEvents () {
  if (padTime) {
    clearTimeout(padTime)
    padTime = null
  }
  document.querySelector('.list-menu-second').style.display = 'block'
}

function levelEvent () {
  padTime = setTimeout(() => {
    document.querySelector('.list-menu-second').style.display = 'none'
  }, 400)
}

function goPage () {
  fullpage_api.moveSectionDown()
}

function changeState () {
  if (fullpage_api.getActiveSection().index < 7) {
    document.querySelector('.footer').style.display = 'block'
  } else {
    document.querySelector('.footer').style.display = 'none'
  }
}

function toDate (time) {
  // 计算天数
  const days = Math.floor(time / (24 * 3600 * 1000))
    .toString()
    .padStart(2, '0')

  // 计算出小时数
  const leave1 = time % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))
    .toString()
    .padStart(2, '0')
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))
    .toString()
    .padStart(2, '0')
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
    .toString()
    .padStart(2, '0')
  const ret = {
    days,
    hours,
    minutes,
  seconds}
  Object.keys(ret).forEach((key) => {
    if (ret[key] < 0) ret[key] = '00'
  })
  return ret
}
let curStep = 1
function checkContent () {
  if (targetDate < Date.now() && curStep === 1) {
    let step1 = document.querySelectorAll('.first-step')
    let step2 = document.querySelectorAll('.second-step')
    Array.from(step2).forEach(item => item.classList.remove('second-step'))
    Array.from(step1).forEach(item => item.style.display = 'none')
    curStep = 2
    clearInterval(window.countDownInterval)
    clearInterval(window.contentInterval)
    setInterval(getInfo, 60000)
    getInfo()
  }
}

function updateContent () {
  let { days, hours, minutes, seconds } = toDate(targetDate - Date.now())
  let time = days + hours + minutes + seconds
  let intervalItems = document.querySelectorAll('.interval-group-item')
  Array.from(intervalItems).forEach((item, index) => {
    item.innerText = time[index]
  })
}
function updateStep2Content () {
  let { days, hours, minutes, seconds } = toDate(lastUserTime - Date.now())
  hours = String(days * 24 + +hours).padStart(2, '0')
  let time = hours + minutes + seconds
  let intervalItems = document.querySelectorAll('.count-down-item')
  Array.from(intervalItems).forEach((item, index) => {
    item.innerText = time[index]
  })
}
updateContent()
if (curStep === 1) {
  window.countDownInterval = setInterval(updateContent, 1000)
}
window.contentInterval = setInterval(checkContent, 1000)

// window.addEventListener("resize", function () {
//   console.log(window.pageXOffset, "屏幕宽度")
// })
let clip = new ClipboardJS('.copy-btn')
let tips = document.querySelector('.copy-tips')

clip.on('success', e => {

  tips.innerText = 'Copy Success!'
  tips.style.display = 'block'
  setTimeout(() => {
    tips.style.display = 'none'
  }, 1000)
})
clip.on('error', e => {
  tips.innerText = 'Copy Failed!'
  tips.style.display = 'block'
  setTimeout(() => {
    tips.style.display = 'none'
  }, 1000)
})
