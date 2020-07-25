var thisIndex = 0; //所处页面

new fullpage('#fullpage', {
    anchors: ['homepage', 'about', 'uniswapx', 'swapxchain','gamex','token','partner','joinus'],
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
var daojishi = null
var middle = document.querySelector('#productfather');
middle.addEventListener('mouseover',hoverEvent);
middle.addEventListener('mouseout',hoverEventTwo)
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




