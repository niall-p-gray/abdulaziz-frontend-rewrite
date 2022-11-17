import base from '@/airtable'

export const state = () => ({
  links: []
})

export const mutations = {
  SET (state, links) {
    state.links = links
  }
}

export const actions = {
  async get ({ commit }, query = {}) {
    const records = await base('Page Links').select(query).all()

    commit('SET', records)
  }
}

export const getters = {
  links (state) {
    return [...state.links].sort((a, b) => a.fields['ToC Order'] - b.fields['ToC Order'])
  }
}
