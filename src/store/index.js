import Vue from 'vue'
import Vuex from 'vuex'
import channel from './channel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    channel
  }
})