
const service = {
  state: {
    serviceId: '',
    isEditMode: false
  },

  mutations: {
    SET_SERVICE_ID: (state, serviceId) => {
      state.serviceId = serviceId
    },
    SET_IS_EDIT_MODE: (state, isEditMode) => {
      state.isEditMode = isEditMode
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


  
  }
}

export default service
