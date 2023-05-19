import { query } from './js/query.js'
import { exec } from 'child_process'
import { modify } from './config/config.js'
import { throttle } from './utils/throttle.js'
import open from 'open'
const { method, parameters } = JSON.parse(process.argv[2])

switch (method) {
  	case 'query':
		await throttle()
		query(parameters[0])
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
