export default function(selector, context) {
  if(context) {
    if(context.nodeType === 1) {
      return context.querySelectorAll(selector);
    } else {
      return document.body.querySelector(context).querySelectorAll(selector)
    }
  }
  return document.body.querySelectorAll(selector)
}