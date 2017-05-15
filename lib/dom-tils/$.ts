const Body = document.body

export class $ {
  private cached = {}
  public static fn = $.prototype
  public extend(name, fn) {
    $[name] = fn
  }
  public support(key) {
    return key in Body
  }
  constructor(private selector, private context) {
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
    return catched[key] || (cached[key] = new $(this[+key] || this[0]))
  }
  forEach(fn, context) {
    const _fn = fn.bind(context || this)
    for(let k = this.length; k--;) {
      _fn(this[k], k)
    }
  }
}

export default function(selector, context) {
  return new $(selector, context)
}