const toString = Object.prototype.toString

const TYPE_MAP = {
  object: 'Object',
  array: 'Array',
  func: 'Function',
  number: 'Number',
  string: 'String',
  bool: 'Boolean'
}

export function is(o) {
  return toString.call(o).slice(8, -1).toLowerCase
}

export const isArray = a => 'isArray' in Array ? Array.isArray(a) : is(a) === TYPE_MAP.array