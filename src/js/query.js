import { config } from '../../config.js'
import { errMsg } from '../common/errMsg.js'
import { generateParams } from './generateParams.js'
import { fileURLToPath } from 'url'
import path from 'path'
import axios from 'axios'
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const iconPath = path.join(__dirname, config.IcoPath)

export async function query(parameters) {
  parameters = parameters.trim()

  const argEnd = parameters.indexOf(' ')
  let params
  params = -1 === argEnd ? generateParams(parameters) : generateParams(parameters.substring(parameters.indexOf(' ') + 1))
  const to = -1 === argEnd ? config.fu : parameters.substring(0, parameters.indexOf(' '))
  const { data: res} = await axios.get(
  `${config.transUrl}?q=${params.query}&appid=${params.appid}&salt=${params.salt}&from=auto&to=${to}&sign=${params.sign}`
  )
  if (!res.trans_result) {
    return catchErr(res.error_code)
  }
  const [content] = res.trans_result
  return success(returnParam(content.dst, 'auto' +  ' => ' + to + '   ' + content.src + ' => ' + content.dst, 100, {
    method: "copy",
    parameters: [content.dst]
  }))
}

function success(result = []) {
  console.log(JSON.stringify({ result }));
}

function err(result = []) {
  result.push(returnParam('打开文档', 'github doc (⭐翻译结果可点击复制到剪切板)', 100, {
    method: "open_url",
    parameters: [config.DocUrl]
  })[0]);
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
      return err(returnParam(errMsg.appidOrKeyNotFound, errMsg.reEC, 100))
    case '54000':
    case '58001':
      return err(returnParam(errMsg.notSL, errMsg.reE, 100))
    case '54003':
    case '54005':
      return err(returnParam(errMsg.notSQE, errMsg.slowE, 100))
  }
}
