<template>
  <div class="topbar">
    <div class="wrapper">
      <span class="logo">在线简历编辑</span>

      <div class="actions">
        <div v-if="logined" class="userActions">
          <span class="welcome">你好，{{user.username}}</span>
          <el-button class="" href="#" @click.prevent="signOut" around>登出</el-button>
        </div>
        <div v-else class="userActions">
          <el-button class="" href="#" @click.prevent="signUpDialogVisible = true" round>注册</el-button>
          <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
            <SignUpForm @success="signIn($event)"/>
          </MyDialog>
          <el-button class="" href="#" type="success" @click.prevent="signInDialogVisible = true" round>登录</el-button>
          <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
          <SignInForm @success="signIn($event)"/>
          </MyDialog>
        </div>
         <router-link to="/preview"><el-button @click="preview">预览</el-button></router-link>
      </div>     
    </div>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'
import {mapActions} from 'vuex'
import store from '../store/index'
export default {
    name: 'Topbar',
    data() {
        return {
            signUpDialogVisible: false,
            signInDialogVisible: false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        logined() {
            return this.user.id
        }
    },
    components: {
        MyDialog, SignUpForm, SignInForm
    },
    methods: {
        signOut() {
            AV.User.logOut()
            this.$store.commit('removeUser')
        },
        signIn(user) {
            this.signUpDialogVisible = false
            this.signInDialogVisible = false
            this.$store.commit('setUser', user)
        },
        ...mapActions(['saveResume']),
        preview() {
          this.$router.replace('/preview')
        }

    }
}
</script>

<style scoped lang="scss">
  .topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    >.wrapper{
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height:64px;
    }
    >.wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo{
      font-size:24px;
      color:#000000;
    }
  }
  .button{ 
    width:72px;
    height:32px;
    border: none;
    cursor: pointer;
    font-size: 18px; 
    background:#ddd;
    color: #222;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover{
      box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
    }
    &.primary{
      background:#02af5f;
      color: white;
    }
  }
  .actions{
    display: flex;
    .userActions{
      margin-right: 3em;
      .welcome{
          margin-right: .5em
      }
    }
  }
</style>