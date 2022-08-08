import { md5 } from '../utils/md5.js'
import { config } from '../config/config.js'
import { XMLHttpRequest } from 'xmlhttprequest';

export function translate(from, to, query, trans) {
    const appid = config.appid;
    const key = config.key;
    const salt = (new Date).getTime();
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    const str1 = appid + query + salt +key;
    const sign = md5(str1);
    const xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

    // 前端设置是否带cookie
    xhr.withCredentials = true;
    query = toUtf8(query)
    xhr.open('GET', `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${query}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
           trans(JSON.parse(xhr.responseText))
        }
    };
}

function toUtf8(data) {
    const bytes = new TextEncoder('utf-8').encode(data)
    let result = ''
    for(var i = 0; i < bytes.length; ++i) {
        result += String.fromCharCode(bytes[i]);
    }
    return result
}