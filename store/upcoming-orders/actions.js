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
    } catch (error) {
      console.log(error)
    }
  }
}
