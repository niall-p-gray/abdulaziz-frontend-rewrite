export default {
  orderItems (state) {
    return state.orderItems
  },
  products (state) {
    return state.products
  },
  clients (state) {
    return state.clients
  },
  ordersPerClient (state) {
    const orders = {}

    const { products, orderItems, clients } = state

    for (let index = 0; index < orderItems.length; index++) {
      const orderItem = orderItems[index]

      const product = products.find(item => item.id === orderItem.fields.Product[0])
      const client = clients.find(cl => cl.id === orderItem.fields['Client Rec ID'][0])

      // If this client has not yet been added
      if (!orders[client.id]) {
        const newClientOrder = {
          products: {},
          client: {
            id: client.id,
            name: client.fields.Name,
            address: client.fields.Address,
            type: client.fields['Client Type']
          },
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

        orders[client.id] = newClientOrder
      }
      // Increment current product orders
      orders[client.id].products[product.id].qty += orderItem.fields.Orders
      // Adjust this client’s total orders
      orders[client.id].totalOrders += orderItem.fields.Orders
    }

    return orders
  }
}
