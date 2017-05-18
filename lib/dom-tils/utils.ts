const toString = Object.prototype.toString

const TYPE_MAP = {
  object: 'Object',
  array: 'Array',
  func: 'Function',
  number: 'Number',
  string: 'String',
  bool: 'Boolean',
  undef: 'Undefined'
}

export function is(o) {
  return toString.call(o).slice(8, -1)
}

export const isArray = a => 'isArray' in Array ? Array.isArray(a) : is(a) === TYPE_MAP.array
export const isString = s => is(s) === TYPE_MAP.string
export const isUndefined = u => is(u) === TYPE_MAP.undef