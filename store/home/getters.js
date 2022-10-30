export default {
  getPageLinks (state) {
    return [...state.pageLinks].sort((a, b) => a.fields['ToC Order'] - b.fields['ToC Order'])
  },
  clients (state) {
    return state.clients
  }
}
