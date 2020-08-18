'use strict'
const port = 9528
module.exports = {
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/dev-api': {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    '^/dev-api': ''
                }
            },
        },
        before: require('./mock/mock-server.js')
    },

}