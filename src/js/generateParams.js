import { md5 } from '../utils/md5.js'
import { config } from '../config/config.js'
import { toUTF8 } from '../utils/toUTF8.js'
export function generateParams(query) {
  const salt = (new Date).getTime()
  const str1 = config.appid + query + salt + config.key
  return {
    query: toUTF8(query),
    appid: config.appid,
    key: config.key,
    salt: (new Date).getTime(),
    str1: str1,
    sign: md5(str1)
  }
}