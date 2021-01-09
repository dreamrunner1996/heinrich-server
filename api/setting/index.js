const listenUrl = 'http://localhost'
const listenPort = 1144

// 设置监听
function SettingListen () {
    console.log(`Click Me to into: ${listenUrl}:${listenPort}`)
}

module.exports = {
    listenUrl,
    listenPort,
    SettingListen
}

