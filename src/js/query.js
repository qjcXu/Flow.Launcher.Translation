import { config } from '../config/config.js'
import { translate } from './translate.js'

export function query(parameters) {
  const argsZ = parameters.trim().match(/^z (\w+)$/)
  const argsE = parameters.trim().match(/^e ([\u4e00-\u9fa5]+)$/)
  if (argsZ !== null || argsE !== null) {
    const args = argsZ === null ? argsE : argsZ
    const to = args[0].charAt(0) === 'e' ? 'en' : 'zh'
    const from = to === 'en' ? 'zh' : 'en'

    return translate(from, to, args[1], res => {
      try {
        success([{
          Title: res.trans_result[0].src + ' => ' + res.trans_result[0].dst,
          SubTitle: from + ' ' + to,
          IcoPath: config.IcoPath,
          score: 100,
        }])
      } catch (e) {
        err([{
          Title: 'slow down',
          SubTitle: 'not support quick enter',
          IcoPath: config.IcoPath,
          score: 100,
        }])
      }
    })
  }
  err([{
    Title: 're enter',
    SubTitle: 'not support quick',
    IcoPath: config.IcoPath,
    score: 100,
  }])
}

function success(result = []) {
  try {
    console.log(JSON.stringify({ result }));
  } catch {
    err([{
      Title: 're enter',
      SubTitle: 'not support one of languages which you entered',
      IcoPath: config.IcoPath,
      score: 100,
    }])
  }
}

function err(result = []) {
  result.push(getHelpResult());
  console.log(JSON.stringify({ result }));
}

function getHelpResult() {
	return {
		Title: 'github doc',
		SubTitle: "Click to open documentation",
		IcoPath: config.IcoPath,
		jsonRPCAction: {
			method: "open_in_url",
			parameters: [config.DocUrl],
		},
		score: 0,
	}
}