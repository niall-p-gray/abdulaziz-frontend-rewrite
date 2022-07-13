import { getParamBuilder, getRequest } from '@/utils'

export default {
  getProducts: async ({ commit }) => {
    const productDataGetParams = getParamBuilder([{ param: 'filterByFormula', value: ['NOT({Name}="")'] }, { param: 'fields[]', value: ['Name', 'Available', 'Lead Time (hrs)', 'Available Days', 'Description'] }, { param: 'sort[0][field]', value: ['Display Order'] }, { param: 'sort[0][direction]', value: ['asc'] }])
    try {
      const productsDataRaw = await getRequest('Products', productDataGetParams, null, null)
      const items = productsDataRaw.records
      commit('setProducts', items)
    } catch (error) {
      console.log(error)
    }
  }
}
