export default {
  ordersPerClient (state, getters, rootState, rootGetters) {
    const orders = rootGetters['entities/orders/orders']
    const orderItems = rootGetters['entities/order-items/orderItems']
    const products = rootGetters['entities/products/products']
    const clients = rootGetters['entities/clients/clients']

    const ordersPerClient = {}

    for (let index = 0; index < orderItems.length; index++) {
      const orderItem = orderItems[index]

      const order = orders.find(o => o.id === orderItem.fields.Order[0])
      const product = products.find(item => item.id === orderItem.fields.Product[0])
      const client = clients.find(cl => cl.id === orderItem.fields['Client Rec ID'][0])

      const readyTime = order.fields['Ready Time']
      const deliveryTime = order.fields['Delivery Time']

      // If this client has not yet been added
      if (!ordersPerClient[client.id]) {
        const newClientOrder = {
          id: order.id,
          products: {},
          client: {
            id: client.id,
            name: client.fields.Name,
            address: order.fields['Delivery Address'] || client.fields.Address,
            type: client.fields['Client Type']
          },
          date: order.fields.Date,
          deliveryMethod: order.fields['Delivery Type'],
          contactName: order.fields['Order Contact'] || client.fields['Primary Contact'],
          phoneNumber: order.fields['Order Phone'] || client.fields.Phone,
          readyTime,
          deliveryTime,
          totalOrders: 0
        }

        // Populate and initialize this client’s products property.
        // We’ll first assume they did not order any quantity of the available products
        products.forEach((p) => {
          newClientOrder.products[p.id] = {
            id: p.id,
            name: p.fields.Name,
            qty: 0,
            displayOrder: p.fields['Display Order']
          }
        })

        ordersPerClient[client.id] = newClientOrder
      }
      // Increment current product orders
      ordersPerClient[client.id].products[product.id].qty += orderItem.fields.Orders
      // Adjust this client’s total orders
      ordersPerClient[client.id].totalOrders += orderItem.fields.Orders
    }

    return ordersPerClient
  }
}
