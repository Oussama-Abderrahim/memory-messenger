const path = require("path");
const vueSrc = "./src";
module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  css: {
    modules: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
};
