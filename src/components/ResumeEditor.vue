<template>
  <div class="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resumeConfig" :class="{active: item.field === selected}" @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resumeConfig" v-show="item.field === selected">
        <div v-if="item.type === 'array'">
         
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <el-button class="" type="danger" size="mini" @click="removeResumeSubfield(item.field, i)">删除</el-button>
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{`${key}`}}</label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
          <el-button class="button" type="primary" size="medium" @click.native="addResumeSubfield(item.field)">增加</el-button>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{key}} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'ResumeEditor',
    computed: {
      ...mapState(["resume", "resumeConfig"]),
      selected:{
        get(){
          return this.$store.state.selected
        },
        set(value){
          return this.$store.commit('switchTab', value)
        }
      },
      resume (){
        return this.$store.state.resume
      },
      resumeConfig(){
        return this.$store.state.resumeConfig
      }
    },
    methods: {
      changeResumeField(path, value){
        this.$store.commit('updateResume',{ path,value })
      },
      addResumeSubfield(field){
        this.$store.commit('addResumeSubfield', {field})
      },
      removeResumeSubfield(field, index){
        this.$store.commit('removeResumeSubfield', {field, index})
      }
    }
  }
</script>

<style lang="scss" scoped>
.resumeEditor{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav{
      width: 80px;
      background: black;
      color: white;
      > ol {
        > li{
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active{
            background: white;
            color: black;
          }
        }
      }
    }
    > .panels{
      flex-grow: 1;
      > li {
        padding: 24px;
        h2{
          margin-bottom: 24px;
        }
      }
    }
    svg.icon{
      width: 24px; 
      height: 24px;
    }
  }
  ol{
    list-style: none;
  }
  .resumeField{
    > label{
      display: block;
    }
    input[type=text]{
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }
  hr{
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
  .subitem{
    position: relative;
    .button.remove{
      position: absolute;
      right: 0;
      top: -3px;
    }
  }
</style>