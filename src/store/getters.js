const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  serviceId: state => state.service.serviceId,
  serviceName: state => state.service.serviceName,
  hasServerEntry: state => state.service.hasServerEntry,
  isEditMode: state => state.service.isEditMode,
  dictList: state => state.app.dictList,
  academyId: state => state.professor.academyId,
  groupId: state => state.professor.groupId,
  professorId: state => state.professor.professorId,
  professorPageState: state => state.professor.professorPageState,
  classType: state => state.professor.classType,
  content: state => state.professor.content,
}
export default getters
