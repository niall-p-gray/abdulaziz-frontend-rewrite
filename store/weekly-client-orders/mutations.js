export default {
  SET_SELECTED_WEEK (state, week) {
    state.selectedWeek = week
  },
  SET_SELECTED_CLIENT_ID (state, id) {
    state.selectedClientId = id
  },
  SET_STAGED_PRODUCT_QTY_UPDATES (state, productOrderToUpdates) {
    state.stagedProductQtyUpdates = productOrderToUpdates
  },
  UPDATE_STAGED_PRODUCT_QTY_UPDATES (state, productOrderToUpdate) {
    if (!state.stagedProductQtyUpdates[productOrderToUpdate.productId]) {
      state.stagedProductQtyUpdates[productOrderToUpdate.productId] = {}
    }

    const stage = state.stagedProductQtyUpdates[productOrderToUpdate.productId]

    stage[productOrderToUpdate.day] = productOrderToUpdate
  }
}
