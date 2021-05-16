

/**
 * 自动绑定this装饰器 
 * @param target 
 * @param key 
 */
export function bindThis<T extends Function>(target: Object, key: string, descriptor: TypedPropertyDescriptor<T>) {
  if(!descriptor || (typeof descriptor.value !== 'function')) {
    throw new TypeError(`Only methods can be decorated with @bindThis, <${key}> is not a method.`) 
  }

  return {
    configurable: true,
    get(this: T): T {
      const bound: T = descriptor.value.bind(this)
      Object.defineProperty(this, key, {
        value: bound,
        configurable: true,
        writable: true
      })

      return bound
    }
  }
}

