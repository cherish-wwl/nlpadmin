import Cookies from 'js-cookie'
import { dictList } from '@/api/common'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    dictList:null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_DICT_LIST:(state, dictList) => {
      state.dictList = dictList
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    UpdateDictList : ({ commit },code) => {
      return new Promise((resolve, reject) => {
        dictList(code).then(response => {
          const data = response.data
          commit('SET_DICT_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default app
