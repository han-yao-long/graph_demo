module.exports = {
    devServer: {
        // proxy: {
        //     '/labsl': {
        //         target: 'http://192.168.64.17:28888',
        //         changeOrigin: true,
        //         secure: false,
        //     },
        //     // 图片服务器
        //     '/image-service': {
        //         target: 'http://39.102.40.239',
        //         changeOrigin: true,
        //         secure: false,
        //     }
        // },
        // 关闭esline
        overlay: {
            warnings: false,
            errors: false
        },
        // lintOnSave: false
    },
    lintOnSave: false,
};