import base from '@/airtable'

export default {
  getClients: async ({ commit }, payload) => {
    try {
      const clients = await base('Clients').select().all()
      const parsedClients = clients.map((client) => {
        return {
          ...client.fields,
          id: client.id
        }
      })
      commit('setClients', parsedClients)
    } catch (error) {
      console.log(error)
    }
  },
  getProducts: async ({ commit }, payload) => {
    try {
      const products = await base('Products').select().all()
      const parsedProducts = products.map((product) => {
        return {
          ...product.fields,
          id: product.id
        }
      })
      commit('setProducts', parsedProducts)
    } catch (error) {
      console.log(error)
    }
  },
  createOrder: async ({ commit }, payload) => {
    try {
      const flavors = payload.flavors
      delete payload.flavors
      const order = await base('Order').create({
        ...payload
      })
      const orderId = order.id
      const orderItemPayload = []
      Object.keys(flavors).forEach((flavor, index) => {
        orderItemPayload.push({
          fields: {
            Order: [
              orderId
            ],
            Product: [
              flavor
            ],
            Orders: Object.values(flavors)[index]
          }
        })
      })
      // chop orderItemPayload into chunks of 10
      const chunks = []
      const chunkSize = 10
      for (let i = 0; i < orderItemPayload.length; i += chunkSize) {
        chunks.push(orderItemPayload.slice(i, i + chunkSize))
      }
      // create order items
      chunks.forEach(async (chunk) => {
        await base('Order Item').create(chunk)
      })
      return order
    } catch (error) {
      console.log(error)
    }
  }
}
