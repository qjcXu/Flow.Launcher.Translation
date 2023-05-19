import { md5 } from '../utils/md5.js'
import { config } from '../config/config.js'

export function generateParams(query) {
  const salt = new Date().getTime()
  const str = config.appid + query + salt + config.key
  const sign = md5(str)
  return {
    query: encodeURI(query),
    appid: config.appid,
    key: config.key,
    salt: salt,
    str: str,
    sign: sign,
    source: query
  }
}
