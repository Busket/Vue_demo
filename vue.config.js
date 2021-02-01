const path = require("path");

module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    config.resolve = {
      // 配置解析别名
      extensions: [".js", ".json", ".vue"], // 自动添加文件名后缀
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components")
      }
    };
  },
  devServer: {
    // 项目运行时候的端口号
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  },
  css: {
    // 是否使用 css 分离插件
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  }
};
