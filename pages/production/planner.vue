<template>
  <div class="container flex flex-col justify-center !w-9/12 mb-12">
    <DatesSelector
    v-model="selectedDates"
    @change="fetchSelectedOrders"
    :forward-days="dateRange.forwardDays"
    :backward-days="dateRange.backwardDays"
    :selectable="!loading"
    />
    <div v-if="!loading && !error" class="w-10/12 mx-auto flex justify-center mt-16">
      <div v-if="aggregatedProductOrders.length">
        <table class="table table--edgeless">
          <thead>
            <tr class="text-muted text-sm">
              <th class="text-center uppercase">
                Product
              </th>
              <th class="text-center uppercase">
                Description
              </th>
              <th class="text-center uppercase">
                Orders
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in aggregatedProductOrders" :key="product.id">
              <td class="text-left">{{ product.name }}</td>
              <td class="text-muted text-left">{{ product.description }}</td>
              <td class="text-center">{{ product.orderCount }}</td>
            </tr>
            <tr>
              <td></td>
              <td><strong>Total</strong></td>
              <td><strong>{{ totalOrders }}</strong></td>
            </tr>
          </tbody>
        </table>
        <button class="btn mt-16">Send To Production Planner Shee</button>
      </div>
      <p v-else class="text-center">No orders found for the selected dates</p>
    </div>
    <div v-else class="text-center mt-20">
      <p v-if="loading">Loading</p>
      <p v-else class="text-red-500">Something went wrong, please try again</p>
    </div>
  </div>
</template>

<script>
import DatesSelector from '@/components/production/planner/DatesSelector'
import base from '@/airtable'
import { TEST_CLIENT_IDS } from '@/utils'

export default {
  components: {
    DatesSelector
  },
  data () {
    return {
      loading: false,
      error: false,
      selectedDates: [],
      records: {
        orderItems: [],
        products: []
      },
      dateRange: {
        backwardDays: 28,
        forwardDays: 14
      }
    }
  },
  mounted () {
    // Initially auto select tomorrow, and load orders for that day
    this.selectedDates.push(this.$moment().add(1, 'days').format('YYYY-MM-DD'))

    this.fetchSelectedOrders()
  },
  computed: {
    aggregatedProductOrders () {
      const productOrders = []

      if (!this.records.orderItems.length || !this.records.products.length) {
        return productOrders
      }

      for (let index = 0; index < this.records.orderItems.length; index++) {
        const orderItem = this.records.orderItems[index]

        const product = this.records.products.find(prod => prod.id === orderItem.fields.Product[0])

        let orderIndex
        const productOrder = productOrders.find((prod, i) => {
          if (prod.id === product.id) {
            orderIndex = i
            return true
          }

          return false
        })

        if (!productOrder) {
          productOrders.push({
            id: product.id,
            name: product.fields.Name,
            description: product.fields.Description,
            orderCount: orderItem.fields.Orders
          })
        } else {
          productOrder.orderCount += orderItem.fields.Orders
          productOrders.splice(orderIndex, 1, productOrder)
        }
      }

      return productOrders.sort((a, b) => b.orderCount - a.orderCount)
    },
    totalOrders () {
      return this.aggregatedProductOrders.reduce((a, b) => a + b.orderCount, 0)
    }
  },
  methods: {
    async fetchSelectedOrders () {
      this.error = false
      this.records.orderItems = []
      this.records.products = []

      if (!this.selectedDates.length) {
        // No dates were selected
        return
      }

      this.loading = true

      await this.getOrderItems()
      await this.getProducts()

      this.loading = false
    },
    async getOrderItems () {
      try {
        const filterBySelectedDates = this.selectedDates.map(date => `DATESTR({Order Date})='${date}'`).join(',')
        // Excludes orders made by test clients
        const exludeTestClients = TEST_CLIENT_IDS.map(id => `NOT({Client Rec ID}='${id}')`).join(',')

        const query = {
          filterByFormula: `AND(OR(${filterBySelectedDates}), OR(${exludeTestClients}))`
        }

        const records = await base('Order Item').select(query).all()

        this.records.orderItems = records
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async getProducts () {
      // Retrieve all products for the order items we just fetched
      try {
        const filterById = this.records.orderItems.map(rec => `RECORD_ID()='${rec.fields.Product[0]}'`).join(',')

        const query = {
          filterByFormula: `OR(${filterById})`
        }

        const records = await base('Products').select(query).all()

        this.records.products = records
      } catch (error) {
        console.error(error)
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.text-muted {
  color: #909090;
}
</style>
