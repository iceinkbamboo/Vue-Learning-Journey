<template>
  <div class="index">
    <!-- 使用组件的三种方式 -->
    <!-- 组件中使用v-model -->
    <Header1 v-model="name" v-bind:title="msg" @select="getEaxm" @exam="toExam"></Header1>
    <!-- <component v-bind:is="currentTabComponent"  v-bind:title="title" @select="getEaxm"></component> -->
    <!-- <div is="Header1"  v-bind:title="title" @select="getEaxm"></div> -->
    <div>{{name}}</div>
    <global-component></global-component>
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
      currentTabComponent: 'Header1',
      name: '',
      params: null
    }
  },
  computed: {
    msg () {
      return this.$store.state.msg
    }
  },
  created () {
    console.log('动态获取参数', this.$route.params)
    if (this.$route.params.id) {
      this.params = this.$route.params
      localStorage.setItem('params', this.$route.params.id)
    }
    console.log('存储data', this.params)
    console.log('localStorage', localStorage.getItem('params'))

    console.log('使用query传参', this.$route.query)
  },
  methods: {
    getEaxm (examid) {
      let that = this
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
    },
    toExam (examid) {
      console.log('跳转到', examid)
      this.$router.push({path: `/exam/${examid}`})
    }
  }
}
</script>

<style lang="less" scoped>
.index{
  width: 100%;
  height: 100%;
  .title{
    color: pink;
  }
}
</style>
