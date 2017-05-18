import { $ } from './$'

$.extend('show', function() {
  this.forEach(el => el.style.display = "block")
})

$.extend('hide', function() {
  this.forEach(el => el.style.display = 'none')
})