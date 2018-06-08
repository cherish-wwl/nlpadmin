
const professor = {
  state: {
    academyId: '',
    groupId: '',
    professorId: '',
    professorInfoId: '',
    professorName: '',
    professorPageState:'',
    classTypeCode:'',
    classType:'',
    content:''
  },

  mutations: {
    SET_ACADEMY_ID: (state, academyId) => {
      state.academyId = academyId
    },
    SET_GROUP_ID: (state, groupId) =>{
      state.groupId = groupId
    },
    set_PROFESSORINFO_ID: ( state, professorInfoId) =>{
      state.professorInfoId = professorInfoId
    },
    SET_PROFESSOR_PAFE_STATE: (state,professorPageState) =>{
      state.professorPageState = professorPageState
    },
    SET_PROFESSOR_INFO: (state, professor) => {
      state.professorId = professor.professorId
      state.professorName = professor.professorName
    },
    SET_CLASS_TYPE_CODE: (state, classTypeCode) => {
      state.classTypeCode = classTypeCode
    },
    SET_CLASS_TYPE: (state, classType) => {
      state.classType = classType
    },
    SET_CONTENT:(state, content) => {
      state.content = content
    }
  },

  actions: {
   
    SetProfessorInfo({ commit },info) {
      commit('SET_ACADEMY_ID',info.academyId )  
      commit('SET_GROUP_ID',info.groupId )  
      commit('SET_PROFESSOR_INFO',{professorId:info.professorId, professorName:info.professorName})
      commit('set_PROFESSORINFO_ID',info.professorInfoId)
      commit('SET_PROFESSOR_PAFE_STATE',info.mode )  
      commit('SET_CLASS_TYPE_CODE',info.classTypeCode )  
      commit('SET_CLASS_TYPE',info.classType )  
      commit('SET_CONTENT',info.content )  
    },
    ClearProfessorInfo({ commit }) {
      commit('SET_ACADEMY_ID','' )  
      commit('SET_GROUP_ID','' )  
      commit('SET_PROFESSOR_INFO',{professorId:'', professorName:''})
      commit('set_PROFESSORINFO_ID','')
      commit('SET_PROFESSOR_PAFE_STATE','' )  
      commit('SET_CLASS_TYPE_CODE','' )  
      commit('SET_CLASS_TYPE','' )  
      commit('SET_CONTENT','')  
    }

  
  }
}

export default professor
