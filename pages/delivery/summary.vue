<template>
  <div>
    <portal to="page-title">Delivery Summary</portal>
    <div v-if="!loading && !error">
      <ClientTypeOrders
      v-for="(clientTypeOrders, type) in groupedClientTypeOrders"
      :key="type"
      :type="type"
      :orders='clientTypeOrders.data' />
      <p v-if="!groupedClientTypeOrders.length" class="text-center">No orders</p>
    </div>
    <div v-else class="text-center">
      <p v-if="loading">Loading...</p>
      <p v-else class="text-red-500">Ops! Something went wrong, tlease try again</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientTypeOrders from '@/components/delivery/summary/ClientTypeOrders'

export default {
  layout: 'dashboard',
  components: {
    ClientTypeOrders
  },
  data () {
    return {
      selectedDate: '2022-09-19', // WIP
      loading: false,
      error: false
    }
  },
  mounted () {
    this.load()
  },
  computed: {
    ...mapGetters({
      products: 'delivery-summary/products',
      ordersPerClient: 'delivery-summary/ordersPerClient'
    }),
    clientOrders () {
      const orders = this.ordersPerClient

      // In order to align product names in the <thead> with their corresponding quantity inside the <tbody>,
      // We need to sort orders[CLIENT_X].products array alphabetically (by the product name)
      const orderedOrders = []

      for (const key in orders) {
        const clientOrder = orders[key]
        const products = clientOrder.products

        const keys = Object.keys(products)

        keys.sort((a, b) => {
          return products[a].name.localeCompare(products[b].name)
        })

        const orderedProducts = keys.reduce((obj, k) => {
          obj[k] = products[k]
          return obj
        }, {})

        orderedOrders.push({
          ...clientOrder,
          products: orderedProducts
        })
      }

      return orderedOrders
    },
    // Returns an object (clientOrders) keyed by client types
    groupedClientTypeOrders () {
      const data = {}

      for (let index = 0; index < this.clientOrders.length; index++) {
        const clientOrder = this.clientOrders[index]
        const clientType = clientOrder.client.type

        if (!data[clientType]) {
          data[clientType] = {
            type: clientType,
            data: []
          }
        }

        data[clientType].data.push(clientOrder)
      }

      return data
    }
  },
  methods: {
    ...mapActions({
      getOrderItems: 'delivery-summary/getOrderItems',
      getProducts: 'delivery-summary/getProducts',
      getClients: 'delivery-summary/getClients'
    }),
    async load () {
      this.loading = true
      this.error = false

      try {
        await this.getOrderItems({
          orderDate: this.selectedDate
        })
        await this.getProducts()
        await this.getClients()
      } catch (error) {
        console.error(error)
        this.error = true
      }

      this.loading = false
    }
  }
}
</script>
