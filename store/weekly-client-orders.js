import moment from 'moment'

const currentWeek = moment().startOf('isoWeek').format('DD-MM-YYYY')

export const state = () => ({
  selectedWeek: currentWeek // Initial week
})

export const mutations = {
  SET_SELECTED_WEEK (state, week) {
    state.selectedWeek = week
  }
}

export const actions = {
  updateSelectedWeek ({ commit }, week) {
    if (!/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(week)) {
      console.error('Given date must be in DD-MM-YYYY format')
      return
    }

    commit('SET_SELECTED_WEEK', week)
  }
}

export const getters = {
  selectedWeek (state) {
    return state.selectedWeek
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
        logo: null
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
      const orderDate = moment(order.fields['Order Date'], 'YYYY-MM-DD').format('DD-MM-YYYY')

      const productOrder = productOrders.find(product => product.id === order.fields.Product[0])
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
