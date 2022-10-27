// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import underscore from 'vue-underscore'
import VueSocketIO from 'vue-socket.io'
import SocketIo from 'socket.io-client'
import VueMoment from 'vue-moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/display.css'

// const socketInstance = 'http://localhost:3030/'
const socketInstance = 'https://websocket-chat-app-v1.herokuapp.com/'

Vue.config.productionTip = false

Vue.use(VueSession)
Vue.use(Vuex)
Vue.use(VueMoment)
Vue.use(underscore)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIo(socketInstance)
}))
Vue.use(ElementUI)

Vue.prototype.$titleMessage = 'Message'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
