import base from '@/airtable'

export default {
  getUpcomingOrders: async ({ commit }, payload) => {
    try {
      // fetch from base Order where field Date is later than today
      const upcomingOrdersRaw = await base('Order').select({
        filterByFormula: '{Date} >= TODAY()',
        sort: [{ field: 'Date', direction: 'asc' }]
      }).all()
      const upcomingOrders = upcomingOrdersRaw.map((order) => {
        return {
          ...order.fields,
          id: order.id
        }
      })
      const filterById = upcomingOrders.map(order => `RECORD_ID()='${order.Client[0]}'`).join(',')

      const query = {
        filterByFormula: `OR(${filterById})`
      }

      const clients = await base('Clients').select(query).all()
      const parsedClients = clients.map((client) => {
        return {
          ...client.fields,
          id: client.id
        }
      })

      for (const order of upcomingOrders) {
        const clientId = order.Client[0]
        const client = parsedClients.find(client => client.id === clientId)
        order.client = client
      }

      // group upcomingOrders by Date property
      const upcomingOrdersGroupedByDate = upcomingOrders.reduce((acc, order) => {
        const date = order.Date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(order)
        return acc
      }, {})

      // group upcomingOrdersGroupedByDate by Client property
      const upcomingOrdersGroupedByClient = Object.keys(upcomingOrdersGroupedByDate).reduce((acc, date) => {
        const orders = upcomingOrdersGroupedByDate[date]
        const ordersGroupedByClient = orders.reduce((acc, order) => {
          const client = order.client
          if (!acc[client.id]) {
            acc[client.id] = []
          }
          acc[client.id].push(order)
          return acc
        }, {})
        acc[date] = ordersGroupedByClient
        return acc
      }, {})

      // commit to store
      commit('setUpcomingOrders', upcomingOrdersGroupedByClient)
      commit('setFilteredOrders', upcomingOrdersGroupedByClient)
    } catch (error) {
      console.log(error)
    }
  },
  filterOrdersByClientType: ({ commit, state }, payload) => {
    if (payload.length === 0) {
      commit('setFilteredOrders', state.upcomingOrders)
    } else {
      commit('setFilteredOrders', [])
      const filters = {
        '1. Demo Box': 'Demo Box',
        '2. Storefront': 'Storefront',
        '3. Coffee Shop': 'Coffee Shops',
        '4. Bar': 'Bars',
        '5. Wholesale': 'Wholesale',
        '6. Catering': 'Catering',
        '7. Direct To Consumer': 'Direct To Consumer'
      }
      const filteredOrders = Object.keys(state.upcomingOrders).reduce((acc, date) => {
        const orders = state.upcomingOrders[date]
        const filteredOrders = Object.keys(orders).reduce((acc, clientId) => {
          const orders = state.upcomingOrders[date][clientId]
          const filteredOrders = orders.filter((order) => {
            const clientType = order.client['Client Type']
            return payload.includes(filters[clientType])
          })
          if (filteredOrders.length > 0) {
            acc[clientId] = filteredOrders
          }
          return acc
        }, {})
        if (Object.keys(filteredOrders).length > 0) {
          acc[date] = filteredOrders
        }
        return acc
      }, {})
      commit('setFilteredOrders', filteredOrders)
    }
  }
}
