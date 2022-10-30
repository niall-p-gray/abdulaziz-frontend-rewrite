import moment from 'moment'

export default {
  selectedWeek (state) {
    return state.selectedWeek
  },
  currentClient (state, getters, rootState, rootGetters) {
    const clients = rootGetters['entities/clients/clients']

    return clients.find(client => client.id === state.selectedClientId)
  },
  selectedWeekProductOrders (state, getters, rootState, rootGetters) {
    const { selectedWeek } = state
    const products = rootGetters['entities/products/products']
    const orderItems = rootGetters['entities/order-items/orderItems']

    const productOrders = products.map((product) => {
      const entry = {
        id: product.id,
        name: product.fields.Name,
        description: product.fields.Description,
        logo: null,
        loadTimeInHrs: product.fields['Lead Time (hrs)'],
        availableDays: product.fields['Available Days']
      }

      // // Some products may not have an icon/logo
      if (product.fields.Logo && product.fields.Logo.length) {
        entry.logo = product.fields.Logo[0].thumbnails.small.url
      }

      // Initialize week orders for this particular product, this will be populated with the correct quantities below
      entry.weekDayOrders = {}
      Array.apply(null, Array(7)).forEach((_, i) => {
        const selectedWeekStart = moment(selectedWeek, 'DD-MM-YYYY')
        const weekDay = selectedWeekStart.isoWeekday(i + 1).format('DD-MM-YYYY')
        entry.weekDayOrders[weekDay] = { qty: 0 }
      })

      entry.totalWeekOrders = 0 // This product’s cumulative orders for currently selected week

      return entry
    })

    // Loop through selected week’s orders and finish populating totalWeekOrders & weekDayOrders properties
    // of each product in productOrders array
    for (let index = 0; index < orderItems.length; index++) {
      const order = orderItems[index]
      const orderDate = moment(order.fields['Order Date'], 'YYYY-MM-DD').format(
        'DD-MM-YYYY'
      )

      const productOrder = productOrders.find(
        product => product.id === order.fields.Product[0]
      )
      const productOrderIndex = productOrders.indexOf(productOrder)

      if (productOrder && productOrder.weekDayOrders[orderDate]) {
        productOrder.weekDayOrders[orderDate].qty += order.fields.Orders
        productOrder.totalWeekOrders += order.fields.Orders

        productOrders.splice(productOrderIndex, 1, productOrder)
      }
    }

    return productOrders
  },
  selectedWeekDailyTotalOrders (state, getters) {
    const dailyOrders = {}
    const weekOrders = getters.selectedWeekProductOrders

    for (let index = 0; index < weekOrders.length; index++) {
      const productOrder = weekOrders[index]

      for (const date in productOrder.weekDayOrders) {
        const order = productOrder.weekDayOrders[date]

        if (dailyOrders[date]) {
          dailyOrders[date] += order.qty
        } else {
          dailyOrders[date] = order.qty
        }
      }
    }

    return dailyOrders
  },
  selectedWeekTotalOrders (state, getters) {
    let total = 0
    const dailyTotalOrders = getters.selectedWeekDailyTotalOrders

    for (const key in dailyTotalOrders) {
      total += dailyTotalOrders[key]
    }

    return total
  }
}
