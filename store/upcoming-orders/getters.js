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

      if (!order.fields['Summed Orders']) {
        continue
      }

      if (!dates[date]) {
        dates[date] = []
      }

      let readyTime = order.fields['Ready Time']
      let deliveryTime = order.fields['Delivery Time']

      if (readyTime) readyTime = moment(readyTime, 'hh:mm').format('h:mm a')
      if (deliveryTime) deliveryTime = moment(deliveryTime, 'hh:mm').format('h:mm a')

      dates[date].push({
        id: order.id,
        readyTime,
        deliveryTime,
        qty: order.fields['Summed Orders'],
        packaging: order.fields.Packaging,
        temperature: order.fields.Temperature,
        notes: order.fields.Notes,
        deliveryNotes: order.fields['Delivery Notes'],
        deliveryDriver: order.fields['Delivery Driver'],
        deliveryType: order.fields['Delivery Type'],
        editUrl: order.fields['Edit Order'].url,
        clientDetails: order.fields['Client Details'],
        address: order.fields['Delivery Address'] || client.fields.Address,
        phoneNumber: order.fields['Order Phone'] || client.fields.Phone,
        clientName: client.fields.Name,
        contactName: order.fields['Order Contact'] || client.fields['Primary Contact']
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
