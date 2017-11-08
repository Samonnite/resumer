import Vuex from 'vuex'
import Vue from 'vue'
import AV from '../lib/leancloud'
import objectPath from 'object-path'
import getAVUser from '../lib/getAVUser'

Vue.use(Vuex)

export default new Vuex.Store({
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
  mutations: {
    // 初始化resume结构
    initState (state, payload) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, [])
        } else {
          Vue.set(state.resume, item.field, {})
          item.keys.map((key) => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      if (payload) {
        Object.assign(state, payload)
      }
    },
    // tab切换
    switchTab (state, payload) {
      state.selected = payload
    },
    // 更新resume展示，并将其保存在localStorage中
    updateResume (state, { path, value }) {
      objectPath.set(state.resume, path, value)
      localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    // 设置id与用户{id:...,username:...}
    setUser (state, payload) {
      Object.assign(state.user, payload)
    },
    // 移除用户id
    removeUser (state) {
      state.user.id = ''
    },
    addResumeSubfield (state, { field }) {
      let empty = {}
      state.resume[field].push(empty)
      // 过滤出与传入参数field相对应的项，由于过滤出获得的数组所以加上索引
      state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubfield (state, { field, index }) {
      state.resume[field].splice(index, 1)
    },
    // 设置resume的数据
    setResume (state, resume) {
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, resume[field])
      })
      state.resume.id = resume.id
    },
    setResumeId (state, { id }) {
      state.resume.id = id
    }
  },
  actions: {
    saveResume ({ state, commit }, payload) {
      // 新建一个Resume的类
      var Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      // 如果这个id存在
      if (state.resume.id) {
        resume.id = state.resume.id
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)

      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)

      resume.setACL(acl)
      resume.save().then(function (response) {
        if (!state.resume.id) {
          commit('setResumeId', { id: response.id })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    fetchResume ({commit}, payload) {
      var query = new AV.Query('Resume')
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resume) => {
        if (resume) {
          commit('setResume', {id: resume.id, ...resume.attributes})
        }
      })
    }
  }
})
