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
  async getClients ({ commit, getters }) {
    const filterById = getters.orderItems.map(rec => `RECORD_ID()='${rec.fields['Client Rec ID'][0]}'`).join(',')

    const query = {
      filterByFormula: `OR(${filterById})`
    }

    const records = await base('Clients').select(query).all()

    commit('setClients', records)
  }
}
