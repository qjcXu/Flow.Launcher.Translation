import { config } from "../../config.js"
export const errMsg = {
  reE: '请重新输入~~',
  openD: '打开文档',
  slowE: '请减慢输入速度~~',
  notSQE: `不支持快速且连续输入, 请等待${config.intervalTime}秒以上`,
  notSL: '不支持你输入的语言',
  reEC: '请检查config.js文件',
  network: '网络连接错误~~',
  appidOrKeyNotFound: '百度翻译appid或key不应为空',
}
