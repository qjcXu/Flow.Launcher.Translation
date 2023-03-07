import { config } from "../config/config.js"
export const message = {
  reE: '请重新输入~~',
  openD: '打开文档',
  slowE: '请减慢输入速度~~',
  notSQE: `不支持快速且连续输入, 请等待${config.intervalTime}秒以上`,
  notSL: '不支持你输入的语言',
  reEC: '请输入tr appid ...以及 tr key ...后回车或者点击回复框修改appid和key',
  network: '网络连接错误~~',
  appidOrKeyNotFound: '百度翻译appid或key不应为空或错误'
}
