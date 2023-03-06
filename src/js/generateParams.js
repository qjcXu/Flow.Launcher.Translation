import { md5 } from '../utils/md5.js'
import { config } from '../../config.js'

export function generateParams(query) {
  const salt = new Date().getTime()
  const str = config.appid + query + salt + config.key
  query = encodeURI(query)
  const sign = md5(str)
  return {
    query: query,
    appid: config.appid,
    key: config.key,
    salt: salt,
    str: str,
    sign: sign
  }
}
