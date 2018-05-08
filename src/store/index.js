import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import service from './modules/service'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    service
  },
  getters
})

export default store
