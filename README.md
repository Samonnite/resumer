# resumer

> Vue在线简历编辑器

写这个项目纯粹为了练手Vue.js 2.0，以熟悉Vue全家桶。

该项目一个通过Vue2.0来构建的一个在线简历编辑器，通过leancloud提供的API实现了登录注册功能，并且数据存储在leancloud。使用Vuex进行状态管理，使用Vue-router2进行路由切换，使用localStorage进行数据的本地存储。
# 技术栈
Vue2.0+Vue-Router+Vuex+webpack+ES6+Sass+leancloud

# 插件介绍
`object-path`: 用来访问和修改对象的深层属性

# 在线预览
[Vue-resume](http://samonnite.xyz/resumer/dist/index)

使用方法：

``` bash
#clone to your computer
git clone https://github.com/Saomonite/resumer.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

# 项目结构
```
├─build
├─config // webpack相关配置
├─dist // webpack打包后的文件
│  └─static
│      ├─css
│      └─js
├─src //开发环境
│  ├─assets //reset.css ui.css
│  ├─components // 组件
│  ├─lib //leancloud相关文件
│  ├─router //路由
│  └─store //Vuex的store
└─static

```

# 数据结构
本项目的数据结构如下，将state保存到`Store`中
```
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
      { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
      { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details'] },
      { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details'] },
      { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details'] },
      { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details'] },
      { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content'] }
    ],
    resume: {
      id: ''
    }
  },

```

# 总结

## 路由跳转
```
this.$router.replace('/')
```
## localStorage
修改ResumeEditor中的数据实时保存到leancloud并使用localStorage进行本地存储，当页面刷新时，直接从localStorage中获取数据。

## Vuex
> Vuex是一个专门为Vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用所有组件的状态，并且以相应的规则保证以一种可预测的方式发生变化。
