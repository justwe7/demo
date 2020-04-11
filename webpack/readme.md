### 初始化webapck项目

生成package.json文件

    npm init

安装webpack

    npm i webpack

webpack4需要安装webpack-cli,装在全局

    npm i webpack-cli -g 

创建一个js文件,main.js
```js
  console.log(123)
```
执行

    webapck main.js
并会生成一个dist目录，包含main.js的代码


### 可配置的webpack
