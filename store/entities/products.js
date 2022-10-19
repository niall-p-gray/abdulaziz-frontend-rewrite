import base from '@/airtable'

export const state = () => ({
  products: []
})

export const mutations = {
  SET (state, products) {
    state.products = products
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Products')
      .select(query)
      .all()

    commit('SET', records)
  }
}

export const getters = {
  products (state) {
    return state.products
  }
}
