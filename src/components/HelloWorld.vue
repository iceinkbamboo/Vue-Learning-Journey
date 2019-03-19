<template>
  <div class="hello">
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.login()
    this.getUser()
  },
  methods: {
    login: function () {
      axios.get('http://localhost:3000/poetry/user', {}).then(function (response) {
        var data = response.data
        console.log('用户信息', data)
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    },
    getUser: function () {
      axios.post('http://localhost:3000/poetry/getUser', {
        username: 'zhsh'
      }).then(function (response) {
        var data = response.data
        console.log('用户信息', data)
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
