import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import service from './modules/service'
import professor from './modules/professor'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    service,
    professor
  },
  getters
})

export default store
