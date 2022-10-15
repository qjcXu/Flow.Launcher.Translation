import { query } from '../src/js/query.js'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url));
query('z english', __dirname)