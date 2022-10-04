import { getParamBuilder, getRequest } from '@/utils'
import base from '@/airtable'

export default {
  getPageLinks: async ({ commit }, payload) => {
    const pageLinksDataGetParams = getParamBuilder([])
    try {
      const pagesLinkRaw = await getRequest('Page Links', pageLinksDataGetParams, null, null)
      const items = pagesLinkRaw.records
      commit('setPageLinks', items)
    } catch (error) {
      console.log(error)
    }
  },
  getClients: async ({ commit }) => {
    const records = await base('Clients').select().all()

    commit('setClients', records)
  }
}
