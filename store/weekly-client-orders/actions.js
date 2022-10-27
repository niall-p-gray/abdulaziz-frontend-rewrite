import moment from 'moment'

export default {
  updateSelectedWeek ({ commit }, week) {
    if (!/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(week)) {
      console.error('Given date must be in DD-MM-YYYY format')
      return
    }

    commit('SET_SELECTED_WEEK', week)
  },
  setSelectedClientId ({ commit }, id) {
    commit('SET_SELECTED_CLIENT_ID', id)
  },
  async commitChanges ({ commit, dispatch, state, getters, rootGetters }) {
    const stagedProductQtyUpdates = state.stagedProductQtyUpdates
    const orders = rootGetters['entities/orders/orders']
    const orderItems = rootGetters['entities/order-items/orderItems']

    // For every product that needs updating
    for (const productId in stagedProductQtyUpdates) {
      const stagedDailyQtyChanges = stagedProductQtyUpdates[productId]
      // Update daily total quantity for current product on specified days
      for (const day in stagedDailyQtyChanges) {
        const { newQty, oldQty } = stagedDailyQtyChanges[day]

        const dateInYyyymmddFormat = moment(day, 'DD-MM-YYYY').format('YYYY-MM-DD')

        // Get current product’s order items for the current day/date
        const currentDayOrderItems = orderItems.filter(({ fields }) => {
          return (
            fields['Order Date'][0] === dateInYyyymmddFormat &&
            fields.Product[0] === productId
          )
        })

        // If there are no order items for current product on this particular date, create one
        if (!currentDayOrderItems.length) {
          // Before we proceed to creating a new order item, we must first make sure we have an order for current date
          let currentDayOrder = orders.find(order => order.fields.Date === dateInYyyymmddFormat)

          console.log('Could not find order items')
          // If there is none, we must create it first
          if (!currentDayOrder) {
            console.log('No order was found')
            const newOrderData = {
              Client: [state.selectedClientId],
              Date: dateInYyyymmddFormat,
              'Data Source': 'Client Order Page'
            }

            try {
              currentDayOrder = await dispatch('entities/orders/create', newOrderData, { root: true })
            } catch (error) {
              console.error(error)
              return
            }
          }
          // Create a new order item
          const newOrderItem = {
            Product: [productId],
            Order: [currentDayOrder.id],
            Orders: newQty
          }

          try {
            await dispatch('entities/order-items/create', newOrderItem, { root: true })
          } catch (error) {
            console.error(error)
            return
          }
          // Move on to the next day, because we don’t need to execute the rest of the code
          continue
        }

        // Reaching here means current product has one or more orders (order items) for current day

        // If the new quantity is set to 0, delete all order items for this product on current day
        if (newQty === 0) {
          const ids = currentDayOrderItems.map(o => o.id)
          console.log(`Deleting ${ids.length} order items`)
          try {
            await dispatch('entities/order-items/delete', ids, { root: true })
          } catch (error) {
            console.error(error)
            return
          }
          continue
        }

        // If it’s just a single order item, we’ll set its quantity to the desired quantity
        // and skip the rest of current day's iteration
        if (currentDayOrderItems.length === 1) {
          if (!await updateOrderItem(dispatch, currentDayOrderItems[0], newQty)) {
            return
          }

          console.log('Updated a single order item for current day')
          continue
        }

        // If the new desired quantity is bigger than current value
        if (newQty > oldQty) {
          // We’ll just pick the first order item and adjust its quantity
          console.log('New quantity is bigger than current value')
          const orderItem = currentDayOrderItems[0]
          const diff = newQty - oldQty
          const qty = orderItem.fields.Orders + diff
          if (!await updateOrderItem(dispatch, orderItem, qty)) {
            return
          }
          continue
        }

        // We’ll loop through this day’s order items and subtract their quantity fields until
        // we reach the given total orders for this day
        let remaining = newQty

        for (let index = 0; index < currentDayOrderItems.length; index++) {
          const orderItem = currentDayOrderItems[index]

          if (remaining <= 0) {
            break
          }

          if (orderItem.fields.Orders === 0) {
            continue
          }

          // Calculate what amount we need to subtract from current order item
          let amountToSubtract
          const currentOrderItemQty = orderItem.fields.Orders

          if (remaining > currentOrderItemQty) {
            amountToSubtract = currentOrderItemQty
          }
          if (
            remaining === currentOrderItemQty ||
            remaining < currentOrderItemQty
          ) {
            amountToSubtract = remaining
          }

          const qty = orderItem.fields.Orders - amountToSubtract
          if (!await updateOrderItem(dispatch, orderItem, qty)) {
            return
          }

          remaining -= amountToSubtract
        }
      }
    }

    commit('SET_STAGED_PRODUCT_QTY_UPDATES', {})

    return true // successful operation
  }
}

// Helpers
const updateOrderItem = async (dispatch, orderItem, qty) => {
  try {
    const payload = {
      id: orderItem.id,
      fields: { Orders: qty }
    }
    await dispatch('entities/order-items/update', [payload], { root: true })
    return true
  } catch (error) {
    console.error(error)
  }

  return false
}
