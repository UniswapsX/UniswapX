var thisIndex = 0; //所处页面

new fullpage('#fullpage', {
    anchors: ['homepage', 'about', 'uniswapx', 'mensaearn','gamex','token','partner','joinus'],
    // sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
    responsiveHeight: 410,
    // navigation: true,
    // navigationTooltips: ['fullPage', 'Open', 'Easy', 'Touch'],
    afterLoad: function (origin, destination, direction) {
        // console.log('回调页面',origin)
        thisIndex = origin.index;
        changeState();
    },

});
var daojishi = null;
var padTime = null;
var middle = document.querySelector('#productfather');
var middleSecond = document.querySelector('#padfather');
var closeIcon = document.querySelector('.arrow-down');
var openIcon = document.querySelector('.arrow-up')
middle.addEventListener('mouseover',hoverEvent);
middle.addEventListener('onclick',hoverEvent);
middle.addEventListener('mouseout',hoverEventTwo);
middleSecond.addEventListener('mouseover',hoverEvents);
middleSecond.addEventListener('mouseout',levelEvent);
function hoverEvent() {
    if (daojishi) {
        clearTimeout(daojishi);
        daojishi = null;
    }
    document.querySelector('.list-menu').style.display = 'block';
}
function hoverEventTwo() {
    daojishi = setTimeout(() => {
        document.querySelector('.list-menu').style.display = 'none';
    },400);
}
function hoverEvents() {
    if (padTime) {
        clearTimeout(padTime);
        padTime = null;
    }
    document.querySelector('.list-menu-second').style.display = 'block';
}
function levelEvent() {
    padTime = setTimeout(() => {
        document.querySelector('.list-menu-second').style.display = 'none';
    },400);
}
function goPage() {
    fullpage_api.moveSectionDown();
}

function changeState() {
    if (fullpage_api.getActiveSection().index < 7) {
        document.querySelector('.footer').style.display = 'block';
    } else {
        document.querySelector('.footer').style.display = 'none';
    }
}




