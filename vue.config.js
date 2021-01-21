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
