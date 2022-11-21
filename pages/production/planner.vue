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
        <PushOrdersToSheetButton :payload="sheetPayload" class="mt-16"/>
        <a href="https://docs.google.com/spreadsheets/d/1OPRX0cFtPdC7r3ZnnpoXBUlSDePdEvLmSXf_AhngwM8/edit#gid=1581088810" target="_blank" class="mt-6 block mx-auto">
          Open Production Planner Sheet
        </a>
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
import PushOrdersToSheetButton from '@/components/production/planner/PushOrdersToSheetButton'
import base from '@/airtable'
import { TEST_CLIENT_IDS } from '@/utils'
import authGuardMixin from '@/mixins/auth-guard'

export default {
  components: {
    DatesSelector,
    PushOrdersToSheetButton
  },
  mixins: [authGuardMixin],
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
      // Initialize f
      const productOrders = this.records.products.map((product) => {
        return {
          id: product.id,
          name: product.fields.Name,
          description: product.fields.Description,
          displayOrder: product.fields['Display Order'],
          orderCount: 0
        }
      })

      for (let index = 0; index < this.records.orderItems.length; index++) {
        const orderItem = this.records.orderItems[index]

        let productOrderIndex
        const productOrder = productOrders.find((product, i) => {
          if (product.id === orderItem.fields.Product[0]) {
            productOrderIndex = i
            return true
          }

          return false
        })

        if (productOrder) {
          productOrder.orderCount += orderItem.fields.Orders
          productOrders.splice(productOrderIndex, 1, productOrder)
        }
      }

      return productOrders.sort((a, b) => a.displayOrder - b.displayOrder)
    },
    totalOrders () {
      return this.aggregatedProductOrders.reduce((a, b) => a + b.orderCount, 0)
    },
    // What data should be sent to update the production planner spreadsheet
    sheetPayload () {
      const orders = this.aggregatedProductOrders.map((p) => {
        return {
          productName: p.name,
          qty: p.orderCount
        }
      })

      return {
        dates: this.selectedDates,
        orders
      }
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
      try {
        const records = await base('Products').select().all()

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
