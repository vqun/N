import { $ } from './$'

$.fn.addClass = function(...classes) {
  if(classes.length > 0) {
    if($.support('classList')) {
      this.forEach(el => el.classList.add(...classes))
    } else {
      const cls = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/)
      el.className = clean(`${cls.join(' ')}  ${classes.join(' ')}`)
    }
  }
  return this
}

$.fn.removeClass = function(...classes) {
  if(classes.length > 0) {
    if($.support('classList')) {
      this.forEach(el => el.classList.remove(...classes))
    } else {
      const cls = clean(el.className.replace(new RegExp(`\\b(?:${classes.join('|')})\\b`, 'g'), ''))
    }
  }
  return this
}

function clean(cls) {
  return cls.replace(/^\s+|\s+$/g, '').replace(/\s{2}/g, ' ')
}