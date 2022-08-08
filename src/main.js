import open from 'open'
import { query } from './js/query.js'
const { method, parameters } = JSON.parse(process.argv[2])

if (method === 'query') {
	debounce(query(parameters[0]), 1000)
}

if (method === 'open_in_url') {
	url = parameters[0]
	open(url)
}
// 防抖
function debounce(fn, wait) {
	var timer = null;
	return function () {
			var context = this
			var args = arguments
			if (timer) {
					clearTimeout(timer);
					timer = null;
			}
			timer = setTimeout(function () {
					fn.apply(context, args)
			}, wait)
	}
}
