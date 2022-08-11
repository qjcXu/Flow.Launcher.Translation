
export function toUTF8(data) {
    const bytes = new TextEncoder('utf-8').encode(data)
    let result = ''
    for(var i = 0; i < bytes.length; ++i) {
        result += String.fromCharCode(bytes[i]);
    }
    return result
}