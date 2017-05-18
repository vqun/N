const Body = document.body

export default function(selector, context?) {
  return new $(selector, context)
}

export class $ {
  public static support(key) {
    return key in Body
  }
  public static extend = function(name, fn) {
    if(!!name && !!fn) this.prototype[name] = fn
  }
  private cached = {}
  private length = 0
  constructor(private selector, private context:any = Body) {
    let elements = null
    if(selector.nodeType === 1) {
      elements = [selector]
    } else if(context) {
      if(context.nodeType === 1)
        elements = context.querySelectorAll(selector);
      else
        elements = Body.querySelector(context).querySelectorAll(selector);
    } else
      elements = Body.querySelectorAll(selector);
    for(let k = elements.length; k--;) {
      this[k] = elements[k]
    }
    this.length = elements.length || 0;
  }
  item(key) {
    return this.cached[key] || (this.cached[key] = new $(this[+key] || this[0]))
  }
  forEach(fn, context?) {
    const _fn = fn.bind(context || this)
    for(let k = 0, l = this.length; k < l;) _fn(this[k], k++)
  }
  map(fn, context?) {
    const _fn = fn.bind(context || this)
    let ret = []
    for(let k = 0, l = this.length; k < l;) ret.push(_fn(this[k], k++));
    return ret
  }
  // Passive Event
  on(name, fn, useCapture = false) {
    if($.support('addEventListener')) {
      this.forEach(el => el.addEventListener(name, fn.bind(el), useCapture))
    } else if($.support('attachEvent')) {
      this.forEach(el => el.attachEvent(`on${name}`, fn.bind(el), useCapture));
    } else {
      this.forEach(el => el[`on${name}`] = fn.bind(el));
    }
    return this
  }
}