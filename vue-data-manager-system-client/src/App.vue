<template>
  <div class="layout" id="App" :class="{'layout-hide-text': spanLeft < 5}">
    <template v-if="login">
      <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
          <Asiderbar :iconSize="iconSize"></Asiderbar>
        </i-col>

        <i-col :span="spanRight">
          <div class="layout-header">
            <i-button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </i-button>
          </div>

          <div class="layout-content">
            <div class="layout-content-main">
              <router-view :database="database"></router-view>
            </div>
          </div>
          <Footerbar></Footerbar>
        </i-col>
      </Row>
    </template>
    <template v-else>
      <div class="b1">
      <h1>管理员登录页面</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" class="f1" >
        <Form-item prop="name" style="width:30%">
          <Input type="text" v-model="formInline.name" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password" style="width:30%">
          <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
      </Form>
      </div>
    </template>
  </div>
</template>

<script>
  import md5 from 'crypto-js/md5';
  import Asiderbar from './components/layout/Asiderbar.vue'
  import Footerbar from './components/layout/Footerbar.vue'
  import {mapActions,mapGetters} from 'vuex'
export default {
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      database:{},
      formInline: {
        name: 'sanjay',
        password: '123456'
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['login']),
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24;
    }
  },
  methods: {
    ...mapActions(['checkLogin']),
    handleSubmit(name) {
      var that=this;
      this.$refs[name].validate((valid) => {
        if (valid) {


          that.formInline.password=md5(that.formInline.password).toString()
          that.$http.post(`http://localhost:3000/users/login`,this.formInline).then(res=>{

            if(res.data){
            that.$Message.success('提交成功!');
            this.database=res.data;
            console.log( this.database)
            that.checkLogin(true)
            }
          })
        } else {
          that.$Message.error('表单验证失败!');
    }
    })
    },
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    }
  },
  components:{
    Asiderbar,
    Footerbar
  }
}
</script>

<style lang="scss" scoped>
  .f1{

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .b1{
    width:100%;height:100%;
    background: #fff;
  }
  h1{
    text-align: center;
    margin-bottom: 30px;
    padding-top: 30px;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>
