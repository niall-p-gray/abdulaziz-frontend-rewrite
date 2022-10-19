import base from '@/airtable'

export const state = () => ({
  orders: []
})

export const mutations = {
  SET (state, orders) {
    state.orders = orders
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Order')
      .select(query)
      .all()

    commit('SET', records)
  }
}

export const getters = {
  orders (state) {
    return state.orders
  }
}
