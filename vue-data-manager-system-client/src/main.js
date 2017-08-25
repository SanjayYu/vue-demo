import Vue from 'vue'; // 路由挂载 // 路由列表
import iView from 'iview';
import App from './App.vue'
import routes from './routes/routes'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView)
Vue.use(VueRouter)
import axios from 'axios'
import {store} from './store/index';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
const router=new VueRouter({
  routes,
  mode:'history'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});