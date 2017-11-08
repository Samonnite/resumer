<template>
  <div>
   <router-view></router-view>
  </div>
 
</template>

<script>
import './assets/reset.css'
import 'normalize.css/normalize.css' 
import './assets/ui.scss'
import icons from './assets/icons'

import store from './store/index'
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'

document.body.insertAdjacentHTML('afterbegin',icons)

export default {
  name: 'app',
  store,	   
  created() {
   //初始化resume的数据结构
   this.$store.commit('initState')
   //获取id与用户名{id:'',usernmae:''}
   let user = getAVUser()
   //将state.user设为当前user
   this.$store.commit('setUser',user)
   //如果user.id存在，即用户登录，从leancloud抓取数据
   if(user.id) {
     this.$store.dispatch('fetchResume').then(() => {
       //新用户注册未保存是先存在localstorge中
       this.restoreResumeFromLocalStorage()
     })
   } else {
     this.restoreResumeFromLocalStorage()
   }
  },
  methods: {
    restoreResumeFromLocalStorage() {
      //从localStorage获取resume
      let resume = localStorage.getItem('resume')
      if(resume) {
        this.$store.commit('setResume',JSON.parse(resume))
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
