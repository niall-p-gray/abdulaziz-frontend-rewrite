import { getParamBuilder, getRequest } from '@/utils'

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
  getCoffeeShops: async ({ commit }, payload) => {
    const coffeeShopsDataGetParams = getParamBuilder([{ param: 'filterByFormula', value: ['{Client Type}="1. Coffee Shop"'] }])
    try {
      const coffeeShopsRaw = await getRequest('Clients', coffeeShopsDataGetParams, null, null)
      const items = coffeeShopsRaw.records
      commit('setCoffeeShops', items)
    } catch (error) {
      console.log(error)
    }
  }
}
