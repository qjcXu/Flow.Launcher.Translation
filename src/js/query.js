import { config } from '../config/config.js'
import { errMsg } from '../common/errMsg.js'
import { generateParams } from '../js/generateParams.js'
import { timeIO } from './timeIO.js'
import path from 'path'
import axios from 'axios'

export async function query(parameters, fPath) {
  const argsZ = parameters.trim().match(/^z (\w+)/)
  const argsE = parameters.trim().match(/^e ([\u4e00-\u9fa5]+)/)
  const iconPath = path.join(fPath, config.IcoPath)
  if (argsZ !== null || argsE !== null) {
    const timePath = path.join(fPath, config.timePath)
    const lastTime = timeIO(timePath, true)
    if (!isPermit(lastTime, timePath)) {
      return err(returnC(errMsg.slowE, errMsg.notSQE, iconPath, null, 100), iconPath)
    }
    const args = argsZ === null ? argsE : argsZ
    const query = args.input.slice(2)
    const params = generateParams(query)
    const to = args[0].charAt(0) === 'e' ? 'en' : 'zh'
    const from = to === 'en' ? 'zh' : 'en'
    const { data: res } = await axios.get(
      `${config.transUrl}?q=${params.query}&appid=${params.appid}&salt=${params.salt}&from=${from}&to=${to}&sign=${params.sign}`
    ).catch(err => {
      return err(returnC(errMsg.network, errMsg.reEC, iconPath, null, 100), iconPath)
    })
    if (res.trans_result) {
      const [content] = res.trans_result
      return success(returnC(content.dst, from + '=>' + to + ' ' + content.src, iconPath, null, 100))
    }
    return err(returnC(errMsg.slowE, errMsg.notSQE, iconPath, null, 100), iconPath)
  }
  return err(returnC(errMsg.reE, errMsg.notSL, iconPath, null, 100), iconPath)
}

function success(result = []) {
  console.log(JSON.stringify({ result }));
}

function err(result = [], iconPath) {
  result.push(returnC('打开文档', 'github doc', iconPath, {
    method: "open_url",
    parameters: [config.DocUrl]
  })[0]);
  console.log(JSON.stringify({ result }));
}

function returnC(title, subTitle, iconPath, jsonRPCAction, score) {
  score ? score : 0
  return [{
    Title: title,
		SubTitle: subTitle,
		IcoPath: iconPath,
		jsonRPCAction: jsonRPCAction,
		score: score
  }]
}

function isPermit(lastTime, timePath) {
  const nowTime = new Date().getSeconds()
  const intervalTime = nowTime < lastTime ? 60 - lastTime + nowTime : nowTime - lastTime
  if (intervalTime > config.intervalTime) {
    timeIO(timePath, false, nowTime)
    return true
  }
  return false
}