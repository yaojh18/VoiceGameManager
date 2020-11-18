module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://VoiceTestGame.Dijkstra.secoder.local', // 修改为你的Django服务器地址
                changeOrigin: true,
            }
        },
        disableHostCheck: true,
    },
    lintOnSave: false,
    productionSourceMap: false,
}