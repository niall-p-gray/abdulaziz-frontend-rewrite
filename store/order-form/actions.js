import { breakUpArrayIntoChunks } from '@/utils'

export default {
  updateFields: ({ commit }, updatedFields) => {
    commit('UPDATE_FIELDS', updatedFields)
  },
  create: async ({ dispatch, getters }, payload) => {
    try {
      const order = await dispatch('entities/orders/create', payload, { root: true })

      for (const prodId in getters.fields.quantities) {
        const qty = getters.fields.quantities[prodId]
        if (qty > 0) {
          const newOrderItem = {
            Product: [prodId],
            Order: [order.id],
            Orders: qty
          }

          await dispatch('entities/order-items/create', newOrderItem, { root: true })
        }
      }

      return order.id
    } catch (error) {
      console.error(error)
    }

    return false
  },
  update: async ({ dispatch, getters, rootGetters }, id) => {
    const orderItems = rootGetters['entities/order-items/orderItems']
    const quantities = getters.fields.quantities

    const payload = {
      id,
      fields: getters.orderEditionPayload
    }

    try {
      await dispatch('entities/orders/update', [payload], { root: true })

      const orderItemsToUpdate = []
      const orderItemsToDelete = []
      const orderItemsToCreate = []

      for (let index = 0; index < orderItems.length; index++) {
        const orderItem = orderItems[index]

        if (orderItem.fields['Order Rec ID'] !== id) continue

        const productId = orderItem.fields.Product[0]
        const qty = quantities[productId]

        if (qty && qty === orderItem.fields.Orders) continue

        if (qty === 0) {
          orderItemsToDelete.push(orderItem.id)
        } else {
          orderItemsToUpdate.push({
            id: orderItem.id,
            fields: {
              Orders: qty
            }
          })
        }
      }

      for (const prodId in quantities) {
        const exists = orderItems.some((o) => {
          return o.fields['Order Rec ID'] === id && o.fields.Product[0] === prodId
        })

        if (!exists) {
          // Does not exist, should be created
          orderItemsToCreate.push({
            Product: [prodId],
            Order: [id],
            Orders: quantities[prodId]
          })
        }
      }
      console.log('orderItemsToUpdate: ', orderItemsToUpdate)
      console.log('orderItemsToDelete: ', orderItemsToDelete)
      console.log('orderItemsToCreate: ', orderItemsToCreate)

      const chunks = breakUpArrayIntoChunks(orderItemsToUpdate, 10)
      for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index]
        await dispatch('entities/order-items/update', chunk, { root: true })
      }

      await dispatch('entities/order-items/delete', orderItemsToDelete, { root: true })

      for (let index = 0; index < orderItemsToCreate.length; index++) {
        const newOrderItem = orderItemsToCreate[index]
        await dispatch('entities/order-items/create', newOrderItem, { root: true })
      }

      return true
    } catch (error) {
      console.error(error)
    }

    return false
  }
}
