import moment from 'moment-timezone'

export default {
  selectedClientTypes (state) {
    return state.selectedClientTypes
  },
  upcomingOrderDates (state, getters, rootState, rootGetters) {
    const orders = rootGetters['entities/orders/orders']
    const clients = rootGetters['entities/clients/clients']

    const dates = {}

    for (let index = 0; index < orders.length; index++) {
      const order = orders[index]
      const date = order.fields.Date
      const client = clients.find(cl => cl.id === order.fields.Client[0])
      const clientType = client.fields['Client Type'].replace(/[^a-zA-z\s]/g, '').trim()

      if (getters.selectedClientTypes.length && !getters.selectedClientTypes.includes(clientType)) {
        continue
      }

      if (!dates[date]) {
        dates[date] = []
      }

      dates[date].push({
        id: order.id,
        readyTime: order.fields['Ready Time'],
        qty: order.fields['Summed Orders'],
        temperature: order.fields.Temperature,
        deliveryType: order.fields['Delivery Type'],
        clientName: client.fields.Name
      })
    }

    // Order day orders by the ready time
    for (const key in dates) {
      const orders = dates[key]

      dates[key] = orders.sort((a, b) => {
        if (!a.readyTime || !b.readyTime) {
          return false
        }

        const aReadyTime = moment(a.readyTime, 'hh:mm')
        const bReadyTime = moment(b.readyTime, 'hh:mm')

        return aReadyTime.unix() - bReadyTime.unix()
      })
    }

    return dates
  }
}
