import base from '@/airtable'

export const state = () => ({
  weeklySales: []
})

export const mutations = {
  SET (state, weeklySales) {
    state.weeklySales = weeklySales
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Weekly Sales')
      .select(query)
      .all()

    commit('SET', records)
  }
}

export const getters = {
  weeklySales (state) {
    return state.weeklySales
  }
}
