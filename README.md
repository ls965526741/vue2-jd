# 仿 JD 商场项目 vue2+vant2+koa2

## 前端

### 技术栈

```
vue2
vuex
axios
vant
vue - router
vue-cropper
less
```

### 安装依赖

```
npm install
```

### 运行项目

```
npm run serve
```

### 实现功能

#### 网络请求模块

- 通过 axiso 发送 ajax 请求
- 请求拦截实现 token 的添加
- 相应拦截实现对错误响应的统一管理

#### 用户登陆模块

- 账号密码登陆
- token 验证
- 修改个人信息
- 修改头像
- vue-cropper 实现头像图片剪切
- 退出登陆

#### 购物车模块

- 添加购物车
- 删除购物车
- 购物车异步更改数量
- 购物车异步更改选中状态
- 购物车全选，非全选

#### 商品展示模块

- 商品分类展示
- 实现长列表滚动加载
- 实现价格高低排序
- 商品详情展示

#### 用户收货地址模块

- 添加地址
- 修改地址
- 设置默认地址
- 修改地址

#### 订单管理模块

- 添加订单
- 订单展示

#### 支付模块

- 未实现

#### 页面权限管理模块

- 使用 beforeEach 判断用户是否登陆，未登陆不允许访问
- 登陆后重定向到之前的页面

## 后端

### 安装依赖

```
cd server
npm install
```

### 连接 mysql 服务器

```js
// server/src/config/config.js

module.exports = {
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: '3306',
  MYSQL_USER: '', // 账号
  MYSQL_PWD: '', // 密码
  MYSQL_DB: '' // 数据库名
}
```

### 导入数据库

```js
//文件在server/src/db中自行导入
```

### 运行项目

```js
cd server
npm run dev
// or
npm run dev
```

### 部分截图

#### 主页面

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/821e7bc8-51f7-43e0-805a-cc88da24bad6.png" style="width:100%; margin-top:10px;" alt="">

#### 详情页

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/f8ce8939-5cfb-4179-a070-474d85f8532a.png" style="width:100%; margin-top:10px;" alt="">

#### 购物车

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/7695808b-d529-4781-ac8f-52d94bdd53f5.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/df99bca8-01b5-4b91-b8bf-3bccebdc13ef.png" style="width:100%; margin-top:10px;" alt="">

#### 地址管理

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/5395b949-eab7-46f6-9127-340f0cf2f030.png" style="width:100%; margin-top:10px;" alt="">

#### 个人中心

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/58cc24bb-95f5-471c-ae73-01f7d425c8e3.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/52cd51f6-42b2-44fa-9eed-0e52bfaf223a.png" style="width:100%; margin-top:10px;" alt="">

## 关于我

##### QQ：965536741
