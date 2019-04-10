<template>
  <div>
    <b>下面是默认插入位置</b>
    <slot v-bind:user="user"></slot>
    <div>
      <b>具名插槽</b>
      <slot name="footer" v-bind:user="user">
        {{user.name}}
      </slot>
      <div>
        <slot name="header1"></slot>
        <slot name="header2"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examTitle',
  data () {
    return {
      user: {
        name: '我来自子组件插槽',
        age: '28',
        sex: 'man'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
