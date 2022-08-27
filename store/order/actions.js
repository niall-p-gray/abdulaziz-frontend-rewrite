import moment from 'moment-timezone'
import Airtable from 'airtable'
import { getParamBuilder, getRequest, singleRecordGetRequest } from '@/utils'

const baseId = process.env.AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY

// eslint-disable-next-line object-shorthand
const base = new Airtable({ apiKey: apiKey }).base(baseId)

const getDayOfWeek = (date) => {
  return moment.tz(date, 'America/Chicago').day()
}

export default {
  getProducts: async ({ commit }, payload) => {
    commit('toggleLoading')
    const productDataGetParams = getParamBuilder([{ param: 'filterByFormula', value: ['AND(NOT({Name}=""), Available=1, NOT({Available Days} = BLANK()))'] }, { param: 'fields[]', value: ['Name', 'Available', 'Lead Time (hrs)', 'Available Days', 'Description'] }, { param: 'sort[0][field]', value: ['Display Order'] }, { param: 'sort[0][direction]', value: ['asc'] }])
    try {
      const productsDataRaw = await getRequest('Products', productDataGetParams, null, null)
      const items = productsDataRaw.records
      const selectedDate = payload.selectedDate
      const clientId = payload.clientId

      const pastCutOff = moment.tz(selectedDate, 'America/Chicago').format('MM/DD/YYYY')
      const futureCutOff = moment.tz(selectedDate, 'America/Chicago').add(7, 'days').format('MM/DD/YYYY')

      const orderDataGetParams = getParamBuilder([{ param: 'filterByFormula', value: ['AND(IS_AFTER({Week Start}, "' + pastCutOff + '"), IS_BEFORE({Week Start}, "' + futureCutOff + '"), {Client Rec ID}="' + clientId + '", NOT({Data Source}="Admin Order Creation Page"))'] }, { param: 'fields[]', value: ['Date', 'Week Start', 'Order Item(s)', 'Last Modified'] }])

      const clientOrderData = await getRequest('Order', orderDataGetParams, null, null)
      const clientOrderDataRecords = clientOrderData.records
      const orderIds = clientOrderDataRecords.map(record => record.id)

      const lastEditedAtArray = clientOrderDataRecords.map(record => moment.tz(record.fields['Last Modified'], 'America/Chicago'))
      const lastEditedAt = moment.max(lastEditedAtArray)
      const formattedLastModified = moment.tz(lastEditedAt, 'America/Chicago').format('M/DD HH:mm')
      commit('setOrderLastEditedAt', formattedLastModified)
      const orderIdsRegex = orderIds.toString().replace(/,/g, '|')
      const orderItemDataGetParams = getParamBuilder([{ param: 'filterByFormula', value: ['REGEX_MATCH({Order Rec ID}, "' + orderIdsRegex + '")'] }, { param: 'fields[]', value: ['Order Rec ID', 'Product', 'Orders'] }])

      const orderItemData = await getRequest('Order Item', orderItemDataGetParams, null, null)
      const orderedProducts = orderItemData.records.map((record) => {
        return {
          id: record.id,
          date: clientOrderDataRecords.filter(order => order.id === record.fields['Order Rec ID'])[0].fields.Date,
          orders: record.fields.Orders,
          productId: record.fields.Product[0]
        }
      })
      const products = items
      products.forEach((product, index) => {
        products[index].orders = []
      })
      orderedProducts.forEach((record) => {
        products.find(product => product.id === record.productId).orders.push({
          orders: record.orders,
          date: record.date,
          id: record.id
        })
      })
      products.forEach((product, pIndex) => {
        const weeklyOrders = new Array(7).fill({
          count: 0
        })
        if (products[pIndex].orders.length > 0) {
          products[pIndex].orders.forEach((order) => {
            const index = getDayOfWeek(order.date) - 1
            weeklyOrders[index] = {
              count: order.orders,
              id: order.id
            }
          })
        }
        products[pIndex].weeklyOrders = weeklyOrders
      })

      commit('toggleLoading')
      commit('setProducts', products)
    } catch (error) {
      commit('toggleLoading')
      console.log(error)
    }
  },
  getClient: async ({ commit }, payload) => {
    try {
      const clientData = await singleRecordGetRequest('Clients', payload)
      commit('setSelectedClient', clientData)
    } catch (error) {
      console.log(error)
    }
  },
  getClientOrders: ({ commit, getters }, payload) => {
    console.log(payload)
  },
  updateOrders: async ({ commit, getters }) => {
    commit('toggleLoading')
    const changedOrders = getters.getChangedOrders
    try {
      const existingOrders = []
      const newOrders = []
      for (const order of changedOrders) {
        if (order.id) {
          existingOrders.push({
            id: order.id,
            fields: {
              Orders: order.count
            }
          })
        } else if (order.count) {
          newOrders.push({
            count: order.count,
            day: order.day,
            productId: order.productId
          })
        }
      }
      const groupedOrders = {}
      newOrders.forEach((order) => {
        if (groupedOrders[order.day]) {
          groupedOrders[order.day].push(order)
        } else {
          groupedOrders[order.day] = [order]
        }
      })
      if (existingOrders.length > 0) {
        await base('Order Item').update(existingOrders)
      }
      for (const date of Object.keys(groupedOrders)) {
        const order = await base('Order').create([{
          fields: {
            Date: date,
            Client: [getters.getSelectedClient['Rec ID']]
          }
        }])
        const orderId = order[0].id
        const orderItems = groupedOrders[date].map((item) => {
          return {
            fields: {
              Product: [item.productId],
              Orders: item.count,
              Order: [orderId]
            }
          }
        })
        await base('Order Item').create(orderItems)
      }
      commit('setChangedOrders', [])
      commit('toggleLoading')
      return
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
