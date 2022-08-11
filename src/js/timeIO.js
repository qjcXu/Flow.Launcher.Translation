import fs from 'fs'

export function timeIO (timePath, isI, nowTime) {
  const lastTime = fs.readFileSync(timePath, 'utf-8')
  if (isI) {
    return JSON.parse(lastTime).time
  }
  writeTime(timePath, lastTime, nowTime)
}

function writeTime(timePath, lastTime, nowTime) {
  const jTime = JSON.parse(lastTime)
  jTime.time = nowTime
  fs.writeFileSync(timePath, JSON.stringify(jTime))
}