module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://voicetestgame-dijkstra.app.secoder.net', // 修改为你的Django服务器地址
                changeOrigin: true,
            }
        },
        disableHostCheck: true,
    },
    lintOnSave: false,
    productionSourceMap: false,
}