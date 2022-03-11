# 开发记录

- customize-cra v1.0.0 和 create-react-app 存在兼容问题，less 配置有问题，后期换 craco 试试

- marked 版本升级，本项目使用的是 v4.0.12，客户端使用的是 0.8.0，使用方法稍有区别



## craco

`customize-cra` 最后一次更新还是在2年前，部分 API 已经与 `CRA` 和 `webpack4` 不兼容，因此改为 `craco`

### **安装**

```
yarn add @craco/craco -D
```

### 修改命令

```
/* package.json */
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test",
}
```

### 配置文件

根目录创建 `craco.config.js` 文件

```
/* craco.config.js */
module.exports = {
  // ...
};
```

