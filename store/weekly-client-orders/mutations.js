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
    const prodId = productOrderToUpdate.productId

    if (!state.stagedProductQtyUpdates[prodId]) {
      state.stagedProductQtyUpdates[prodId] = {}
    }

    const stagedQtyUpdates = state.stagedProductQtyUpdates[prodId]

    stagedQtyUpdates[productOrderToUpdate.day] = productOrderToUpdate

    state.stagedProductQtyUpdates = {
      ...state.stagedProductQtyUpdates,
      [prodId]: { ...stagedQtyUpdates }
    }
  }
}
