<template>
  <div class="preview">
    <ResumePreview></ResumePreview>
    <el-button class="goback"  type="primary" @click="goback">返回</el-button>
  </div>
</template>

<script>
 import ResumePreview from './ResumePreview'
export default {
  name: 'preview',
  components: {
    ResumePreview
  },
  methods: {
    goback() {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  min-width: 1024px;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.goback {
  position: fixed;
  right: 100px;
  top: 20px;  
}
</style>