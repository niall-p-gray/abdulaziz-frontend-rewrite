import base from '@/airtable'

export const state = () => ({
  orders: []
})

export const mutations = {
  SET (state, orders) {
    state.orders = orders
  },
  PUSH (state, order) {
    state.orders.push(order)
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
  }
}

export const getters = {
  orders (state) {
    return state.orders
  }
}
