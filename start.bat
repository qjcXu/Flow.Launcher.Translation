@echo off
SET plugin_dir=%~dp0%
SET icon=%plugin_dir%images\icon.png
SET "icon=%icon:\=/%"
SET title="Error: 您的电脑不存在 Node.js"
SET subtitle="请下载并安装 Nods.js"


where /q node
IF ERRORLEVEL 1 (
    echo {"result": [{"Title": %title%, "Subtitle": %subtitle%, "IcoPath": "%icon%"}]}
) ELSE (
    node %plugin_dir%/src/main.js %*
)
