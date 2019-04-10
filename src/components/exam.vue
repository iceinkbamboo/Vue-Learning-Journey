<template>
  <div>
    <exam-title>
      <template v-slot:default="slotProps">
        <h1>{{examid}}</h1>
        {{slotProps.user.name}}
      </template>
      <template #footer="slotProps">
        {{slotProps.user.name}}
      </template>
      <template #[slotName]>{{'我是' + slotName}}</template>
    </exam-title>
    <el-button type="success" plain @click="changeSlot">改变插槽</el-button>
  </div>
</template>

<script>
import examTitle from './examTitle'
export default {
  name: 'exam',
  components: {
    examTitle
  },
  data () {
    return {
      examid: null,
      slotName: 'header1'
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
