!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=9)}([function(t,n,e){"use strict";function r(t,n){return new o(t,n)}n.__esModule=!0;var i=document.body;n.default=r;var o=function(){function t(t,n){void 0===n&&(n=i),this.selector=t,this.context=n,this.cached={},this.length=0;var e=null;e=1===t.nodeType?[t]:n?1===n.nodeType?n.querySelectorAll(t):i.querySelector(n).querySelectorAll(t):i.querySelectorAll(t);for(var r=e.length;r--;)this[r]=e[r];this.length=e.length||0}return t.support=function(t){return t in i},t.prototype.item=function(n){return this.cached[n]||(this.cached[n]=new t(this[+n]||this[0]))},t.prototype.forEach=function(t,n){for(var e=t.bind(n||this),r=0,i=this.length;r<i;)e(this[r],r++)},t.prototype.map=function(t,n){for(var e=t.bind(n||this),r=[],i=0,o=this.length;i<o;)r.push(e(this[i],i++));return r},t.prototype.on=function(n,e,r){return void 0===r&&(r=!1),t.support("addEventListener")?this.forEach(function(t){return t.addEventListener(n,e.bind(t),r)}):t.support("attachEvent")?this.forEach(function(t){return t.attachEvent("on"+n,e.bind(t),r)}):this.forEach(function(t){return t["on"+n]=e.bind(t)}),this},t.extend=function(t,n){t&&n&&(this.prototype[t]=n)},t}();n.$=o},function(t,n,e){"use strict";n.__esModule=!0;var r=e(0);e(6),e(7),e(5),n.default=r.default},function(t,n,e){"use strict";function r(t){return i.call(t).slice(8,-1)}n.__esModule=!0;var i=Object.prototype.toString,o={object:"Object",array:"Array",func:"Function",number:"Number",string:"String",bool:"Boolean",undef:"Undefined"};n.is=r,n.isArray=function(t){return"isArray"in Array?Array.isArray(t):r(t)===o.array},n.isString=function(t){return r(t)===o.string},n.isUndefined=function(t){return r(t)===o.undef}},function(t,n,e){"use strict";n.__esModule=!0;var r=e(1),i=e(8),o=document.body,s=function(){function t(t){this.page=t,this.init()}return t.prototype.init=function(){var t=this.page.data()[0],n=t.name,e=t.o,r=t.i;this.config={name:n,o:e,i:r}},t.prototype.pageIn=function(){var t=this.config,n=t.o,e=t.i;this.page.swapClass(n,e).show()},t.prototype.pageOut=function(){var t=this.config,n=t.o,e=t.i;this.page.swapClass(e,n).hide()},t}(),u=function(){function t(t,n){void 0===n&&(n=o),this.container=n,this.pageEls=null,this.pages=[],this.currentPage=null,this.currentPageIndex=0,this.MaxPageIndex=0,this.pageEls=r.default(t,this.container),this.init()}return t.prototype.init=function(){var t=this;this.pageEls.forEach(function(n,e){!!n.dataset&&t.pages.push(new s(this.item(e)))},this.pageEls),this.run()},t.prototype.run=function(){var t=this;this.currentPage=this.pages[0],this.MaxPageIndex=this.pages.length-1,i.default(this.container,{swipeLeft:function(){var n=++t.currentPageIndex;n>t.MaxPageIndex&&(n=0),t.currentPage.pageOut(),(t.currentPage=t.pages[n]).pageIn(),t.currentPageIndex=n},swipeRight:function(){var n=--t.currentPageIndex;n<0&&(n=t.MaxPageIndex),t.currentPage.pageOut(),(t.currentPage=t.pages[n]).pageIn(),t.currentPageIndex=n}}),this.currentPage.pageIn()},t}();n.default=u},function(t,n){},function(t,n,e){"use strict";n.__esModule=!0;var r=e(0),i=e(2);r.$.extend("attr",function(t,n){return this.map(i.isUndefined(n)?function(n){return n.getAttribute(t)}:function(e){return e.setAttribute(t,n)})}),r.$.extend("data",function(){return this.map(function(t){return"dataset"in t?t.dataset:t.getAttribute("dataset")})})},function(t,n,e){"use strict";function r(t){return t.replace(/^\s+|\s+$/g,"").replace(/\s{2}/g," ")}function i(t){return s.isArray(t)?t:s.isString(t)?t.replace(/^\s+|\s+$/g,"").split(/\s+/):[]}n.__esModule=!0;var o=e(0),s=e(2);o.$.extend("addClass",function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.length>0&&(o.$.support("classList")?this.forEach(function(n){return(e=n.classList).add.apply(e,t);var e}):this.forEach(function(n){return n.className=r(i(n.className).join(" ")+"  "+t.join(" "))})),this}),o.$.extend("removeClass",function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.length>0&&(o.$.support("classList")?this.forEach(function(n){return(e=n.classList).remove.apply(e,t);var e}):this.forEach(function(n){return n.className=r(n.className.replace(new RegExp("\\b(?:"+t.join("|")+")\\b","g"),""))})),this}),o.$.extend("swapClass",function(t,n){return s.isArray(t)||(t=i(t)),s.isArray(n)||(n=i(n)),this.removeClass(t).addClass(n)})},function(t,n,e){"use strict";n.__esModule=!0;var r=e(0);r.$.extend("show",function(){this.forEach(function(t){return t.style.display="block"})}),r.$.extend("hide",function(){this.forEach(function(t){return t.style.display="none"})})},function(t,n,e){"use strict";function r(t,n,e){function r(t,n){var e=n.x-t.x,r=n.y-t.y,i=Math.abs(r)-Math.abs(e)>0;return Math.abs(e)<5&&Math.abs(r)<5?null:i?r<0?u:a:e<0?o:s}void 0===e&&(e={touchstart:null,touchmove:null,touchend:null});var c;i.default(t).on("touchstart",function(t){e.touchstart&&e.touchstart();var n=t.touches[0];c={x:n.screenX,y:n.screenY}}).on("touchend",function(t){e.touchend&&e.touchend();var i=t.changedTouches[0],o={x:i.screenX,y:i.screenY},s=r(c,o);s&&"function"==typeof n["swipe"+s]&&n["swipe"+s](),c={}}).on("touchmove",function(t){t.stopPropagation(),e.touchmove&&e.touchmove()})}n.__esModule=!0;var i=e(1),o="Left",s="Right",u="Up",a="Down";n.default=r},function(t,n,e){"use strict";function r(){new i.default(".page")}n.__esModule=!0,e(4);var i=e(3);n.default=r,r()}]);