// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import i18n from './i18n/'
import store from './store/index'

var locales = i18n
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})