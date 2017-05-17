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
  forEach(fn, context) {
    const _fn = fn.bind(context || this)
    for(let k = this.length; k--;) {
      _fn(this[k], k)
    }
  }
  on(name, fn) {
    return this
  }
}