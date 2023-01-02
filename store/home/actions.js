import base from '@/airtable'

export default {
  getPageLinks: async ({ commit }, payload) => {
    try {
      const records = await base('Page Links').select().all()
      commit('setPageLinks', records)
    } catch (error) {
      console.log(error)
    }
  },
  getClients: async ({ commit }) => {
    const records = await base('Clients').select().all()

    commit('setClients', records)
  }
}
