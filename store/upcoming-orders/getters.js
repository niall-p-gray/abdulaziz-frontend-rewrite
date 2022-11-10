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

      if (!order.fields['Summed Orders']) {
        continue
      }

      let readyTime = order.fields['Ready Time']

      if (readyTime) {
        readyTime = moment(readyTime, 'hh:mm').format('h:mm a')
      }

      dates[date].push({
        id: order.id,
        readyTime,
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
        // Sort orders so that orders with undefined ready time come first
        if (!a.readyTime && !b.readyTime) {
          return 0
        }

        if (!a.readyTime) {
          return -1
        }

        if (!b.readyTime) {
          return 1
        }

        const aReadyTime = moment(a.readyTime, 'h:mm a')
        const bReadyTime = moment(b.readyTime, 'h:mm a')

        return aReadyTime.unix() - bReadyTime.unix()
      })
    }

    return dates
  }
}
