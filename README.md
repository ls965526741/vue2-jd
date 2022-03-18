# 仿 JD 商场项目 vue2+vant2+koa2

## 前端

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

- 使用 beforeEach 对判断用户是否登陆，未登陆不允许访问
- 登陆后重定向到之前的页面

## 后端

### 安装依赖

```
cd server
npm install
```

### 连接 mysql 服务器

```js
// server/src/config/db.config.js

module.exports = {
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: '3306',
  MYSQL_USER: 'root',
  MYSQL_PWD: '123123',
  MYSQL_DB: 'jingdong'
}
```

### 导入数据库

```js
//文件在server/src/db中自行导入
```

### 运行项目

```
npm run dev
```

## 关于我

##### QQ：965536741 微信：xlh950829
