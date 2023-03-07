import { createRequire } from 'module'
import { writeFileSync } from 'fs'
const require = createRequire(import.meta.url)
const config = require('../../config.json')

export function modify(op, params) {
  config[op] = params
  writeFileSync('./config.json', JSON.stringify(config, null, '\t'), 'utf-8')
}

export { config }