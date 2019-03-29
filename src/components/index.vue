<template>
  <div class="index">
    <!-- 使用组件的三种方式 -->
    <Header1 v-bind:title="msg" @select="getEaxm"></Header1>
    <!-- <component v-bind:is="currentTabComponent"  v-bind:title="title" @select="getEaxm"></component> -->
     <!-- <div is="Header1"  v-bind:title="title" @select="getEaxm"></div> -->
  </div>
</template>

<script>

import Header1 from './header.vue'
export default {
  name: 'index',
  components: {
    Header1
  },
  data () {
    return {
      title: '',
      currentTabComponent: 'Header1'
    }
  },
  computed: {
    msg () {
      return this.$store.state.msg
    }
  },
  methods: {
    getEaxm (examid) {
      let that = this
      console.log('examid', examid)
      this.$axios.post('http://localhost:5050/poetry/getExam', {
        examid: examid
      }).then(function (response) {
        var data = response.data
        console.log(data)
        if (data.stat === 1) {
          // that.title = data.data.title
          that.$store.commit('changeMsg', data.data.title)
          console.log(that.$store.state.msg)
        } else {
          that.$message.warning(data.msg)
          // that.title = ''
          that.$store.commit('changeMsg', '')
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index{
  width: 100%;
  height: 100%;
}
</style>
