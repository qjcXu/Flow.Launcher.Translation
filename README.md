# Flow.Launcher.Translation

## 描述

一款使用在Flow Launcher中的翻译插件(当前只支持百度翻译中英互译)

## 使用方法

## 安装 Node.js

如果已安装请忽略

未安装请到 [nodejs.org](https://nodejs.org/zh-cn/) 官方网页上下载最新版nodejs运行环境

## 安放位置

将下载得到的 zip 文件解压后得到的文件放在 C:\Users\用户名\AppData\Roaming\FlowLauncher\Plugins 目录下，之后重启Flow Launcher，最后在插件选项中开启该插件

### 注册

在[百度翻译开放平台]([百度翻译开放平台](https://fanyi-api.baidu.com/product/11))中注册成为使用者，获取百度翻译的 appid 和 key

### 配置

在 `config` 目录下的 `config.js` 文件中填写你的 appid 和 key

![config](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/imgs/config.png)

### 使用

| 代码  | 描述         |
| --- | ---------- |
| e   | 将指定内容翻译成英文 |
| z   | 将指定内容翻译成英文 |

中译英，`tr e 苹果` 

![中译英](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/imgs/option2.png)

英译中， `tr z apple` 

![英译中](https://cdn.jsdelivr.net/gh/qjcXu/Flow.Launcher.Transition/src/assets/imgs/option1.png)

目前只支持中英互译， 且只能翻译单个词或单个句子

另外单词输入速度尽量慢速，过快会因为这 **插件 js 无法添加函数防抖功能** 而无法快速的再次发起请求，最终无法获取翻译结果。
