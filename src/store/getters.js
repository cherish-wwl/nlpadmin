const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  serviceId: state => state.service.serviceId,
  hasServerEntry: state => state.service.hasServerEntry,
  isEditMode: state => state.service.isEditMode,
  dictList: state => state.app.dictList
}
export default getters
