import { config } from '../config/config.js'
import { errMsg } from '../common/errMsg.js'
import { generateParams } from './generateParams.js'
import { fileURLToPath } from 'url'
import path from 'path'
import axios from 'axios'
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const iconPath = path.join(__dirname, config.IcoPath)
export async function query(parameters) {
  parameters = parameters.trim()
  const firstArgEnd = parameters.indexOf(' ')
  const from = parameters.substring(0, firstArgEnd)
  const secondArgEnd = parameters.indexOf(' ', firstArgEnd + 1)
  const to = parameters.substring(firstArgEnd + 1, secondArgEnd)
  const params = generateParams(parameters.substring(secondArgEnd + 1))
  const { data: res} = await axios.get(
  `${config.transUrl}?q=${params.query}&appid=${params.appid}&salt=${params.salt}&from=${from}&to=${to}&sign=${params.sign}`
  )
  if (!res.trans_result) {
    return catchErr(res.error_code)
  }
  const [content] = res.trans_result
  return success(returnC(content.src, from + ' => ' + to + ' ' + content.dst,100))
}

function success(result = []) {
  console.log(JSON.stringify({ result }));
}

function err(result = []) {
  result.push(returnC('打开文档', 'github doc', 100, {
    method: "open_url",
    parameters: [config.DocUrl]
  })[0]);
  console.log(JSON.stringify({ result }));
}

function returnC(title, subTitle, score, jsonRPCAction) {
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
      return err(returnC(errMsg.appidOrKeyNotFound, errMsg.reEC, 100))
    case '54000':
    case '58001':
      return err(returnC(errMsg.notSL, errMsg.reE, 100))
    case '54003':
    case '54005':
      return err(returnC(errMsg.notSQE, errMsg.slowE, 100))
  }
}
