import Vue from 'vue'
import Router from 'vue-router'
import Resume from '@/components/Resume'
import Preview from '@/components/Preview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    }
  ]
})
