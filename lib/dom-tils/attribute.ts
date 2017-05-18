import { $ } from './$'
import { isUndefined } from './utils'

$.extend('attr', function(name, value?) {
  return this.map(isUndefined(value) ? el => el.getAttribute(name) : el => el.setAttribute(name, value))
})

$.extend('data', function() {
  return this.map(el => 'dataset' in el ? el.dataset : el.getAttribute('dataset'))
})