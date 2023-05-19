import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const config = require('../../config.json')

// 节流 默认500ms
export function throttle(delay = config.delay) {
  return new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, delay)
})
}
