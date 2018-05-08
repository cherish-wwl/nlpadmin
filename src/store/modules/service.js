
const service = {
  state: {
    serviceId: '',
 
  },

  mutations: {
    SET_SERVICE_ID: (state, serviceId) => {
      state.serviceId = serviceId
    }
  },

  actions: {
   
     // 设置服务id
     SetServiceId({ commit },serviceId) {
        //console.log(serviceId)
        commit('SET_SERVICE_ID',serviceId )
       
        
      },
 

  
  }
}

export default service
