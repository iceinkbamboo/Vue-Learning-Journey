<template>
  <div>{{examid}}</div>
</template>

<script>
export default {
  name: 'exam',
  data () {
    return {
      examid: null
    }
  },
  created () {
    this.examid = this.$route.params.examid
    console.log('获取参数', this.$route.params)
  }
}
</script>

<style lang="less" scoped>

</style>
