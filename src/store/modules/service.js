
const service = {
  state: {
    serviceId: '',
    isEditMode: false,
    hasServerEntry:''
  },

  mutations: {
    SET_SERVICE_ID: (state, serviceId) => {
      state.serviceId = serviceId
    },
    SET_IS_EDIT_MODE: (state, isEditMode) => {
      state.isEditMode = isEditMode
    },
    SET_HASSERVERENTRY:(state, hasServerEntry) => {
      state.hasServerEntry = hasServerEntry
    }
  },

  actions: {
   
    // 设置服务id
    SetServiceId({ commit },serviceId) {
      //console.log(serviceId)
      commit('SET_SERVICE_ID',serviceId )   
    },
    // 设置编辑状态
    SetIsEditMode({ commit },isEditMode) {
      console.log("===============设置编辑状态===============")
      console.log(isEditMode)
      commit('SET_IS_EDIT_MODE',isEditMode )   
    },
    // 设置hasServerEntry  :判断是否有接入信息
    SetHasServerEntry({ commit },hasServerEntry) {
      commit('SET_HASSERVERENTRY',hasServerEntry )   
    },

  
  }
}

export default service
