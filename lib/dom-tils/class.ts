import { $ } from './$'
import { isArray } from './utils'

$.extend('addClass', function(...classes) {
  if(classes.length > 0) {
    if($.support('classList')) {
      this.forEach(el => el.classList.add(...classes))
    } else {
      this.forEach((el) => {
        const cls = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/)
        el.className = clean(`${cls.join(' ')}  ${classes.join(' ')}`)
      })
    }
  }
  return this
})

$.extend('removeClass', function(...classes) {
  if(classes.length > 0) {
    if($.support('classList')) {
      this.forEach(el => el.classList.remove(...classes))
    } else {
      this.forEach(el => el.className = clean(el.className.replace(new RegExp(`\\b(?:${classes.join('|')})\\b`, 'g'), '')))
    }
  }
  return this
})

$.extend('swapClass', function(oldClass, newClass) {
  if(!isArray(oldClass)) {
    oldClass = splitToArray(oldClass)
  }
  if(!isArray(newClass)) {
    newClass = splitToArray(newClass)
  }
  this.removeClass(oldClass).addClass(newClass)
})

function clean(cls) {
  return cls.replace(/^\s+|\s+$/g, '').replace(/\s{2}/g, ' ')
}

function splitToArray(cls) {
  if(cls)
  return cls.replace(/^\s+|\s+$/g, '').split(/\s+/)
}
