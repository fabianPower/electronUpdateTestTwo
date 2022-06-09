alert("hi")

const server = 'https://github.com/fabianPower/electronUpdateTest/tree/master'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
    autoUpdater.checkForUpdates()
}, 1000)