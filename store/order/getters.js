export default {
  getProducts (state) {
    return state.products
  },
  getSelectedClient (state) {
    return state.selectedClient
  },
  getSelectedOrders (state) {
    return state.selectedOrders
  },
  getChangedOrders (state) {
    return state.changedOrders
  },
  getLoading (state) {
    return state.loading
  }
}
