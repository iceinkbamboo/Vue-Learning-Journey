<template>
  <div>
    <div>
      <p>这是题目{{examid}}</p>
    </div>
    <exam-title>
      <template v-slot:default="slotProps">
        {{slotProps.user.name}}
      </template>
      <template #footer="slotProps">
        {{slotProps.user.age}}
      </template>
      <template #[slotName]>{{'我是' + slotName}}</template>
    </exam-title>
    <el-button type="success" plain @click="changeSlot">改变插槽</el-button>
    <part-compoent v-bind:user="user"></part-compoent>
  </div>
</template>

<script>
import examTitle, { partCompoent } from './examTitle'
export default {
  name: 'exam',
  components: {
    partCompoent,
    examTitle
  },
  data () {
    return {
      examid: null,
      slotName: 'header1',
      user: {
        age: '23'
      }
    }
  },
  created () {
    this.examid = this.$route.params.examid
    console.log('获取参数', this.$route.params)
  },
  methods: {
    changeSlot () {
      let slotName = ''
      if (this.slotName === 'header1') {
        slotName = 'header2'
      } else {
        slotName = 'header1'
      }
      this.slotName = slotName
    }
  }
}
</script>

<style lang="less" scoped>

</style>
