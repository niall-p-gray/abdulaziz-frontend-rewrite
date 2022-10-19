import base from '@/airtable'

export const state = () => ({
  orderItems: []
})

export const mutations = {
  SET (state, orderItems) {
    state.orderItems = orderItems
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Order Item')
      .select(query)
      .all()

    commit('SET', records)
  }
}

export const getters = {
  orderItems (state) {
    return state.orderItems
  }
}
