<template>
  <div>
    <portal to="page-title">Delivery Summary</portal>
    <DeliverySummaryDateSelector
      @change="onDateSelected"
      :initial-date="initialDate.format('YYYY/MM/DD')"
      class="mt-16"
    />
    <ClientTypeFilter
      v-show="availableClientTypeList.length"
      v-model="selectedClientTypes"
      :options="availableClientTypeList"
    />
    <div v-if="!loading && !error">
      <div class="mt-16">
        <ClientTypeOrders
        v-for="(clientTypeOrders, type) in groupedClientTypeOrders"
        :key="type"
        :type="type"
        :orders='clientTypeOrders.data' />
        <p v-if="!Object.keys(groupedClientTypeOrders).length" class="text-center">No orders</p>
      </div>
      <div class="print-all-orders">
        <button class="btn">Print orders</button>
      </div>
    </div>
    <div v-else class="text-center mt-40">
      <p v-if="loading">Loading...</p>
      <p v-else class="text-red-500">Ops! Something went wrong, tlease try again</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientTypeOrders from '@/components/delivery/summary/ClientTypeOrders'
import DeliverySummaryDateSelector from '@/components/delivery/summary/DeliverySummaryDateSelector '
import ClientTypeFilter from '@/components/filters/ClientTypeFilter'

export default {
  layout: 'dashboard',
  components: {
    ClientTypeOrders,
    ClientTypeFilter,
    DeliverySummaryDateSelector
  },
  data () {
    return {
      selectedClientTypes: [],
      loading: false,
      error: false,
      initialDate: this.$moment() // today
    }
  },
  mounted () {
    this.load(this.initialDate.format('YYYY-MM-DD')) // Initially load day’s orders
  },
  computed: {
    ...mapGetters({
      products: 'delivery-summary/products',
      ordersPerClient: 'delivery-summary/ordersPerClient',
      clients: 'delivery-summary/clients'
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

        if (this.selectedClientTypes.length && !this.selectedClientTypes.includes(clientType)) {
          continue
        }

        if (!data[clientType]) {
          data[clientType] = {
            type: clientType,
            data: []
          }
        }

        data[clientType].data.push(clientOrder)
      }

      return data
    },
    availableClientTypeList () {
      const list = []

      this.clients.forEach((client) => {
        const type = client.fields['Client Type']

        if (!list.includes(type)) {
          list.push(type)
        }
      })

      return list
    }
  },
  methods: {
    ...mapActions({
      getOrderItems: 'delivery-summary/getOrderItems',
      getProducts: 'delivery-summary/getProducts',
      getClients: 'delivery-summary/getClients'
    }),
    onDateSelected (date) {
      this.load(date)
    },
    async load (orderDate) {
      this.loading = true
      this.error = false

      try {
        await this.getOrderItems({ orderDate })
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

<style scoped>
.print-all-orders{
  @apply flex justify-center mt-6 lg:mt-10;
}
</style>
