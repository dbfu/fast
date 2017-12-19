// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from './plugins/loading.js'
import './plugins/loading.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from "axios"

Vue.use(iView)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Loading)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
