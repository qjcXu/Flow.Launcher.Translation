# Flow.Launcher.Translation

## 描述

一款使用在Flow Launcher中的使用[百度翻译](https://fanyi-api.baidu.com/)的翻译插件

## 使用方法

## 安装 Node.js

如果已安装请忽略

未安装请到 [nodejs.org](https://nodejs.org/zh-cn/) 官方网页上下载最新版nodejs运行环境

## 安放位置

将下载得到的 zip 文件解压后得到的文件放在 C:\Users\用户名\AppData\Roaming\FlowLauncher\Plugins 目录下，之后重启Flow Launcher，最后在插件选项中开启该插件

## 注册

在[百度翻译开放平台](https://fanyi-api.baidu.com/product/11)中注册成为使用者，获取百度翻译的 appid 和 key

## 配置

在 `config` 目录下的 `config.js` 文件中填写你的 appid 和 key

![config](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/images/config.png)

## 使用

### 中译英，`tr zh en 苹果`

![中译英](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/images/option2.png)

### 英译中， `tr en zh apple`

![英译中](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/images/option1.png)

### 自动识别源语言

![auto](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/images/option3.png)

## tips

单词输入速度尽量慢速，过快会因为免费的接口限制每秒请求次数而无法快速发起请求，最终无法获取翻译结果。

### 支持的语言

| 名称     | 代码   | 名称    | 代码  | 名称    | 代码  |
| ------ | ---- | ----- | --- | ----- | --- |
| 自动检测   | auto | 中文    | zh  | 英语    | en  |
| 韩语     | kor  | 法语    | fra | 西班牙语  | spa |
| 泰语     | th   | 阿拉伯语  | ara | 俄语    | ru  |
| 葡萄牙语   | pt   | 德语    | de  | 意大利语  | it  |
| 希腊语    | el   | 荷兰语   | nl  | 波兰语   | pl  |
| 保加利亚语  | bul  | 爱沙尼亚语 | est | 丹麦语   | dan |
| 芬兰语    | fin  | 捷克语   | cs  | 罗马尼亚语 | rom |
| 斯洛文尼亚语 | slo  | 瑞典语   | swe | 匈牙利语  | hu  |
| 繁体中文   | cht  | 越南语   | vie | 日语    | jp  |
| 粤语     | yue  |       |     |       |     |
