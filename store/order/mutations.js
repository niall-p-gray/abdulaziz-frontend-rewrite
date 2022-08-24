export default {
  setProducts (state, products) {
    state.products = products
  },
  setSelectedClient (state, client) {
    state.selectedClient = client
  },
  setSelectedOrders (state, orders) {
    state.selectedOrders = orders
  },
  setChangedOrders (state, orders) {
    state.changedOrders = orders
  },
  toggleLoading (state) {
    state.loading = !state.loading
  },
  setOrderLastEditedAt (state, editedAt) {
    state.orderLastEditedAt = editedAt
  }
}
