import { query } from './js/query.js'
import { fileURLToPath } from 'url'
import open from 'open'
import path from 'path'
const { method, parameters } = JSON.parse(process.argv[2])
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (method === 'query') {
	query(parameters[0], __dirname)
}

if (method === 'open_url') {
	open(parameters[0])
}