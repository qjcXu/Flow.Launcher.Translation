import { query } from './js/query.js'
import { exec } from 'child_process'
import { modify } from './config/config.js'
import open from 'open'
const { method, parameters } = JSON.parse(process.argv[2])

const throttleQuery = throttle(query, 500)

switch (method) {
  	case 'query':
    		throttleQuery(parameters[0])
    		break
	case 'open_url':
		open(parameters[0])
		break
	case 'copy':
		exec(`echo ${parameters[0]} | clip`)
		break
	case 'modify':
		modify(parameters[0], parameters[1])
		break
}

// 节流函数
function throttle(func, delay) {
  	let lastTime = 0
  	return function (...args) {
    		const currentTime = Date.now()
    		if (currentTime - lastTime > delay) {
      			func.apply(this, args)
      			lastTime = currentTime
    		}
  	}
}
