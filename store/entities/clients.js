import base from '@/airtable'

export const state = () => ({
  clients: []
})

export const mutations = {
  SET (state, clients) {
    state.clients = clients
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Clients')
      .select(query)
      .all()

    commit('SET', records)
  }
}

export const getters = {
  clients (state) {
    return state.clients
  }
}
