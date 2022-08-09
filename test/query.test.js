import { config } from '../src/config/config.js'
import { translate } from '../src/js/translate.js'

function query(parameters) {
  const argsZ = parameters.trim().match(/^z (\w+)$/)
  const argsE = parameters.trim().match(/^e ([\u4e00-\u9fa5]+)$/)
  if (argsZ !== null || argsE !== null) {
    const args = argsZ === null ? argsE : argsZ
    const to = args[0].charAt(0) === 'e' ? 'en' : 'zh'
    const from = to === 'en' ? 'zh' : 'en'
    const q = args.input.slice(2)
    translate(from, to, q, (res) => {
      success([{
        Title: res.trans_result[0].src + ' ==> ' + res.trans_result[0].dst,
        IcoPath: config.IcoPath,
        score: 100,
      }])
    })
  }
  return err([{
    Title: 'enter z or e',
    SubTitle: 'not support one of languages which you entered',
    IcoPath: config.IcoPath,
    score: 100,
  }])
}

query('z apple')

function success(result = []) {
  try {
    console.log(JSON.stringify({ result }));
  } catch {
    err([{
      Title: 're-enter',
      IcoPath: config.IcoPath,
      score: 100,
    }])
  }
}

function err(result = []) {
  console.log(JSON.stringify({ result }));
}

function getHelpResult() {
	return {
		Title: '13',
		SubTitle: "Click to open documentation",
		IcoPath: config.IcoPath,
		jsonRPCAction: {
			method: "open_in_url",
			parameters: [config.DocUrl],
		},
		score: 0,
	}
}