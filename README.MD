# bitbar 天气插件
> a bitbar weather plugin

## 下载插件
```bash
git clone https://github.com/linchengzzz/bitbar-weather.git
```

## 安装 node_modules
```bash
cd bitbar-weather
npm install
npm run build
```

## 已知 BUG
已知 bitbar.darkMode 无法更改，所以 插件无法适配 Mac 菜单栏，用两个插件分别不同颜色解决
需要在打包后的代码中加入 #!/usr/bin/env /usr/local/bin/node 来执行node环境

## 修改颜色
 - 浅色菜单：
 修改 ./src/app.js 23行  color = 'black'
 - 深色菜单：
 修改 ./src/app.js 23行  color = 'white'
 > 注意要安装相应的 node_modules
