<template>
  <div>
    <global-component></global-component>
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
    <part-compoent v-bind:user="user"></part-compoent>
  </div>
</template>

<script>
export let partCompoent = {
  template: `
    <div>
      <p>{{title}}</p>
      <p @click="alertMsg">{{user.age}}</p>
    </div>
  `,
  data () {
    return {
      title: '我来自局部组件'
    }
  },
  props: ['user'],
  methods: {
    alertMsg () {
      console.log('我是组件')
    }
  }
}
export default{
  name: 'examTitle',
  components: {
    partCompoent
  },
  data () {
    return {
      user: {
        name: '我来自子组件插槽',
        age: '28',
        sex: 'man'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
