<template>
  <div class="login">
    <div class="login-main">
      <el-input class="login-main_input" placeholder="请输入用户名" v-model="username" @blur="nameBlur" clearable></el-input>
      <el-input class="login-main_input" placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-input class="login-main_input" v-if="!isLogin" placeholder="请确认密码" v-model="password2" show-password></el-input>
      <el-button class="login-main_btn" type="success" plain @click="login">{{bntText}}</el-button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      bntText: '登录',
      isLogin: true
    }
  },
  created () {
  },
  methods: {
    login: function () {
      let that = this
      if (this.isLogin) {
        if (!this.username || !this.password) {
          this.$message.warning('请输入用户名或密码')
          return false
        }
        axios.post('http://localhost:3000/poetry/login', {
          username: that.username,
          password: that.password
        }).then(function (response) {
          var data = response.data
          if (data.stat === 1) {
            console.log('登录成功')
            that.$router.push({path: '/index'})
          } else {
            that.$message.warning(data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        }).then(function () {
        })
      } else {
        if (!this.username || !this.password || !this.password2) {
          this.$message.warning('请完善登录信息')
          return false
        }
        if (this.password !== this.password2) {
          this.$message.warning('两次输入的密码不同')
          return false
        }
        axios.post('http://localhost:3000/poetry/register', {
          username: that.username,
          password: that.password
        }).then(function (response) {
          var data = response.data
          if (data.stat === 1) {
            console.log('注册成功')
            that.$router.push({path: '/index'})
          } else {
            that.$message.warning(data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        }).then(function () {
        })
      }
    },
    getUser: function (username) {
      let that = this
      axios.post('http://localhost:3000/poetry/getUser', {
        username: username
      }).then(function (response) {
        var data = response.data
        if (data.stat === 1) {
          that.isLogin = true
          that.bntText = '登录'
        } else {
          that.isLogin = false
          that.bntText = '注册'
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    },
    nameBlur: function () {
      this.getUser(this.username)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &-main{
      width: 300px;
      height: 230px;
      &_input{
        margin-bottom: 20px;
      }
      &_btn{
        width: 300px;
        height: 50px;
      }
    }
  }
</style>
