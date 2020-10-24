import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";

export default {
  //用于打包的配置
  input: "./src/index.js",
  output: {
    file: "dist/vue.js",
    name: "Vue", //全局的名字Vue
    format: "umd", //window.vue
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**", //这个目录不需要babe转化
    }),
    serve({
        openPage: "/public/index.html",
        port: 3000,
        open: true,
        contentBase: ''
    })
  ],
};
