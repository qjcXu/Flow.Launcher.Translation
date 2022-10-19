import { query } from './js/query.js'
import open from 'open'
const { method, parameters } = JSON.parse(process.argv[2])

if (method === 'query') {
	query(parameters[0])
}

if (method === 'open_url') {
	open(parameters[0])
}
