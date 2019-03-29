<template>
  <div class="header">
    <div class="form">
      <el-input v-model="examid"></el-input>
      <el-button class="form_btn" type="success" plain @click="getSelect">查询</el-button>
    </div>
    <div>
      <el-button v-if="title" class="form_btn" type="success" plain @click="toExam">{{title}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header1',
  props: ['title'],
  data () {
    return {
      examid: ''
    }
  },
  methods: {
    getSelect () {
      this.$emit('select', this.examid)
    },
    toExam () {
      this.$emit('exam', this.examid)
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  .form{
    width: 200px;
    margin: 0 auto;
    &_btn{
      width: 200px;
      margin-top: 20px;
    }
  }
}
</style>
