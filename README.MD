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
```

## 已知 BUG
已知 bitbar.darkMode 无法更改，所以 插件无法适配 Mac 菜单栏，用两个插件分别不同颜色解决

## 加载插件
 - 浅色菜单：
 将 ./plugins/WeatherLight.30m.js 放入bitbar 插件包
 - 深色菜单：
 将 ./plugins/WeatherDark.30m.js 放入 bitbar 插件包
 > 注意要安装相应的 node_modules