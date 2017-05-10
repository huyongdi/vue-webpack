/**
 * Created by Grandomics7052 on 2017/5/10.
 */
/**
 * 阻止冒泡
 */
function stopEventBubble (event) {
  let e = event || window.event;
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

/**
 * 阻止默认事件
 */
function stopBase (event) {
  let e = event || window.event;
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
  return false;
}

/**
 * 获得地址栏参数
 */
function getUrlParam (name) {
  let url = window.location.href;
  let value = "";
  if (url.indexOf("?") > 0) {
    let paramStr = $.trim(url.substr(url.indexOf('?') + 1));
    paramStr = paramStr.replace('#', '');
    if (paramStr !== "") {
      let paramArr = paramStr.split('&');
      if (paramArr !== null && paramArr.length > 0) {
        for (let i = 0; i < paramArr.length; i++) {
          let arr = paramArr[i].split('=');
          if (arr !== null && arr.length === 2) {
            if (arr[0] === name) {
              value = arr[1];
              break;
            }
          }
        }
      }
    }
  }
  return value;
}

module.exports = {
  stopEventBubble:stopEventBubble,
  stopBase:stopBase,
  getUrlParam:getUrlParam,
};
