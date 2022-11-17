import base from '@/airtable'
import { breakUpArrayIntoChunks } from '@/utils'

export const state = () => ({
  orders: []
})

export const mutations = {
  SET (state, orders) {
    state.orders = orders
  },
  PUSH (state, order) {
    state.orders.push(order)
  },
  UPDATE (state, newInstance) {
    const oldInstance = state.orders.find(order => order.id === newInstance.id)
    const oldInstanceIndex = state.orders.indexOf(oldInstance)

    state.orders.splice(oldInstanceIndex, 1, newInstance)
  },
  DELETE (state, ids) {
    state.orders = state.orders.filter(o => !ids.includes(o.id))
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Order')
      .select(query)
      .all()

    commit('SET', records)
  },
  async create ({ commit }, fields) {
    try {
      const record = await base('Order').create(fields)
      commit('PUSH', record)
      return record
    } catch (error) {
      throw new Error(`Could not create order: ${error}`)
    }
  },
  async update ({ commit }, payload) {
    try {
      const records = await base('Order').update(payload)
      records.forEach(order => commit('UPDATE', order))
    } catch (error) {
      throw new Error(`Could not update order: ${error}`)
    }
  },
  async delete ({ commit }, ids) {
    if (!Array.isArray(ids)) {
      throw new TypeError('An array of order ids is required')
    }

    try {
      // Airtable only allows a max of 10 records to delete in a single request
      const chunks = breakUpArrayIntoChunks(ids, 10)
      for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index]
        await base('Order').destroy(chunk)
      }

      commit('DELETE', ids)
    } catch (error) {
      throw new Error(`Could not delete given order(s): ${error}`)
    }
  }
}

export const getters = {
  orders (state) {
    return state.orders
  }
}
