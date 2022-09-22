import base from '@/airtable'
import { TEST_CLIENT_IDS } from '@/utils'

export default {
  async getOrderItems ({ commit }, data = {}) {
    if (data.orderDate === undefined) {
      throw new Error('orderDate is required')
    }

    const exludeTestClients = TEST_CLIENT_IDS.map(id => `NOT({Client Rec ID}='${id}')`).join(',')

    const query = {
      filterByFormula: `AND(DATESTR({Order Date})='${data.orderDate}', OR(${exludeTestClients}))`
    }

    const records = await base('Order Item')
      .select(query)
      .all()

    commit('setOrderItems', records)
  },
  async getProducts ({ commit }) {
    const records = await base('Products').select().all()

    commit('setProducts', records)
  },
  async getClients ({ commit }) {
    const records = await base('Clients').select().all()

    commit('setClients', records)
  }
}
