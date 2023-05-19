import { config } from '../config/config.js'
import { message } from '../common/message.js'
import { generateParams } from './generateParams.js'
import { fileURLToPath } from 'url'
import path from 'path'
import axios from 'axios'
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const iconPath = path.join(__dirname, config.iconPath)

// 配置参数
const configParams = ['appid', 'key', 'dest', 'delay']

export async function query(parameters) {
  parameters = parameters.trim()

  let commond = parameters.toLowerCase()
  // 显示配置
  if (configParams.includes(commond)) {
    return success(returnParam(commond + ' ' + config[commond], commond + '的配置信息如上', 100))
  }

  const splitParams = parameters.split(' ')

  // 修改配置
  commond = splitParams[0].toLowerCase()
  if (splitParams.length === 2 && configParams.includes(commond)) {
    return success(returnParam(commond + ' ' + splitParams[1], '点击此项或者回车修改', 100, {
      method: 'modify',
      parameters: [commond, splitParams[1]]
    }))
  }

  // 解析参数
  const to = languages.includes(commond) ? commond : config.dest
  const params = languages.includes(commond) ? generateParams(parameters.substring(parameters.indexOf(' ') + 1)) : generateParams(parameters)

  // 没有输入命令或者单词（防止无效请求）
  if (parameters === '' || params.source === to) {
    return err(returnParam(message.parameterNotFound, message.parameterNotFoundSubTitle, 100))
  }

  // 正常翻译
  const { data: res} = await axios.get(
    `${config.apiUrl}?q=${params.query}&appid=${params.appid}&salt=${params.salt}&from=auto&to=${to}&sign=${params.sign}`
  )
  if (!res.trans_result) {
    return catchErr(res.error_code)
  }
  const [content] = res.trans_result
  return success(returnParam(content.dst, 'auto' +  ' => ' + to + '   ' + content.src + ' => ' + content.dst, 100, {
    method: 'copy',
    parameters: [content.dst]
  }))
}

function success(result = []) {
  result.push(returnParam(message.tips, message.tipsSubTitle, 100, {
    method: 'open_url',
    parameters: [config.docUrl]
  })[0])
  console.log(JSON.stringify({ result }));
}

function err(result = []) {
  result.push(returnParam(message.openDoc, message.openDocSubTitle, 100, {
    method: 'open_url',
    parameters: [config.docUrl]
  })[0])
  console.log(JSON.stringify({ result }));
}

function returnParam(title, subTitle, score, jsonRPCAction) {
  return [{
    Title: title,
    SubTitle: subTitle,
    IcoPath: iconPath,
    jsonRPCAction: jsonRPCAction,
    score: score
  }]
}


function catchErr(errCode) {
  switch (errCode) {
    case '52001':
    case '52002':
    case '52003':
    case '54001':
    case '90107':
      return err(returnParam(message.appidOrKeyNotFound, message.appidOrKeyNotFoundSubTitle, 100))
    case '54000':
    case '58001':
      return err(returnParam(message.notSL, message.reE, 100))
    case '54003':
    case '54005':
      return err(returnParam(message.notSQE, message.slowE, 100))
  }
}

const languages = [
  'zh', 'kor', 'fra', 'spa', 'th', 'ara', 'ru', 'pt',
  'de', 'it', 'el', 'nl', 'pl', 'bul', 'est', 'dan',
  'fin', 'cs', 'rom', 'slo', 'swe', 'hu', 'cht', 'vie',
  'jp', 'yue', 'en'
]
