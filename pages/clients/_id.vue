<template>
  <div class="order-page">
    <portal to="page-title">Client Ordering Page</portal>
    <div>
      <div v-if="!loading && !error" >
        <WeekSelector v-model="selectedWeek" />
        <OrderFormDesktop :selected-week="selectedWeek" class="mt-16" />
      </div>
      <div class="mt-16 flex justify-center">
        <span v-if="loading">Loading...</span>
        <span v-else class="text-red-500">An error occured, please try refreshing</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderFormDesktop from '@/components/client-ordering-page/OrderFormDesktop'
import WeekSelector from '@/components/client-ordering-page/WeekSelector'
import airQuery from '@/utils/airtable-query-builder'

export default {
  layout: 'dashboard',
  components: {
    OrderFormDesktop,
    WeekSelector
  },
  data () {
    return {
      selectedWeek: this.$moment().startOf('isoWeek'),
      loading: false,
      error: false
    }
  },
  async mounted () {
    const fromDate = this.$moment().endOf('isoWeek').subtract(4, 'weeks').format('MM/DD/YYYY')
    const toDate = this.$moment().startOf('isoWeek').add(4, 'weeks').format('MM/DD/YYYY')
    const clientId = 'recRmSjmCCnfCTnj4'

    this.loading = true
    this.error = false

    try {
      await this.getClients({ filterByFormula: airQuery().whereId(clientId).get() })

      await this.getProducts({
        filterByFormula: airQuery()
          .whereInId(this.currenClient.fields['Chosen Products']) // Only fetch products chosen by this client
          .where('Available', 1)
          .notEmpty('Name')
          .notEmpty('Available Days')
          .get()
      })

      await this.getWeeklySales({
        filterByFormula: airQuery()
          .after('Week Start', fromDate)
          .before('Week Start', toDate)
          .where('Client Rec ID', clientId)
          .get()
      })

      await this.getOrders({
        filterByFormula: airQuery()
          .after('Week Start', fromDate)
          .before('Week Start', toDate)
          .where('Client Rec ID', clientId)
          .not('Data Source', 'Admin Order Creation Page')
          .get()
      })

      if (this.orders.length) {
        await this.getOrderItems({
          filterByFormula: airQuery().whereIn('Order Rec ID', this.orders.map(o => o.id)).get()
        })
      }
    } catch (error) {
      console.error(error)
      this.error = true
    }

    this.loading = false
  },
  methods: {
    ...mapActions({
      getClients: 'entities/clients/get',
      getProducts: 'entities/products/get',
      getOrders: 'entities/orders/get',
      getOrderItems: 'entities/order-items/get',
      getWeeklySales: 'entities/weekly-sales/get'
    })
  },
  computed: {
    ...mapGetters({
      clients: 'entities/clients/clients',
      orders: 'entities/orders/orders'
    }),
    currenClient () {
      return this.clients[0]
    }
  }
}
</script>
