import { config } from "../config/config.js"
export const message = {
  reE: '请重新输入~~',
  openDoc: '打开文档',
  openDocSubTitle: 'Github Doc (⭐翻译结果可点击复制到剪切板)',
  slowE: '请减慢输入速度~~',
  notSQE: `不支持快速且连续输入, 请等待${config.delay}毫秒以上`,
  notSL: '不支持你输入的语言',
  network: '网络连接错误~~',
  appidOrKeyNotFound: '百度翻译appid或key不应为空或错误',
  appidOrKeyNotFoundSubTitle: '示例tr appid [appid] 以及 tr key [key] 修改appid和key',
  parameterNotFound: '参数不能为空',
  parameterNotFoundSubTitle: '示例 tr en 苹果 或者 tr 苹果',
  tips: 'Tips',
  tipsSubTitle: '点击返回的翻译结果项或者按下回车键即可复制翻译结果'
}
