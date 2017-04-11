function addSlideTo(el, fn, callback) {
  var LEFT = 'Left', RIGHT = 'Right', UP = 'Up', DOWN = 'Down';

  callback = callback || {};
  var touchInfo;
  $(el).on('touchstart', function(evt) {
    callback.touchstart && callback.touchstart();
    var touch = evt.touches[0];
    touchInfo = {
      x: touch.screenX,
      y: touch.screenY
    }
  }).on('touchend', function(evt) {
    callback.touchend && callback.touchend();
    var touch = evt.changedTouches[0];
    var end =  {
      x: touch.screenX,
      y: touch.screenY
    }
    var dir = getInfo(touchInfo, end);
    // swipeRight|Left|Up|Down
    dir && typeof fn['swipe' + dir] === 'function' && fn['swipe' + dir]();
    touchInfo = {};
  }).on('touchmove', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    callback.touchmove && callback.touchmove()
  })

  function getInfo(p1, p2) {
    var deltaX = p2.x - p1.x;
    var deltaY = p2.y - p1.y;
    var ratio = Math.abs(deltaY) - Math.abs(deltaX) > 0;
    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return null;
    if (ratio) {
      return deltaY < 0 ? UP : DOWN
    } else {
      return deltaX < 0 ? LEFT : RIGHT
    }
  }
}