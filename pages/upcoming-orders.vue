<template>
  <div class="upcoming-orders">
    <portal to="page-title">Upcoming Orders</portal>
    <div v-if="!loading && !error" class="mt-16">
      <div>
        <ClientTypeFilter :options="clientTypes" @change="onClientTypesFilterChange" />
      </div>
      <div>
        <div v-for="(orders, date) in upcomingOrderDates" :key="date" class="days">
          <div class="day">
            <h1 class="date">
              <mark>{{ formatDate(date) }}</mark>
            </h1>
            <h2 class="qty">
              {{ orders.length }} orders
            </h2>
          </div>
          <div class="day-orders-container">
            <UpcomingOrder v-for="order in orders" :key="order.id" :order="order" />
          </div>
        </div>
      </div>
      </div>
    <div v-else class="mt-16 flex justify-center">
      <span v-if="loading">Loading...</span>
      <span v-else class="text-red-500">An error occured, please try refreshing</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapActions, mapGetters } from 'vuex'
import airQuery from '@/utils/airtable-query-builder'
import { TEST_CLIENT_IDS } from '@/utils'
import ClientTypeFilter from '@/components/filters/ClientTypeFilter'
import UpcomingOrder from '@/components/upcoming-orders/UpcomingOrder'

export default {
  components: {
    ClientTypeFilter,
    UpcomingOrder
  },
  layout: 'dashboard',
  data () {
    return {
      clientTypes: [
        'Demo Box',
        'Storefront',
        'Coffee Shops',
        'Bar',
        'Wholesale',
        'Catering',
        'Direct To Consumer'
      ],
      loading: true,
      error: false
    }
  },
  computed: {
    ...mapGetters({
      upcomingOrderDates: 'upcoming-orders/upcomingOrderDates',
      orders: 'entities/orders/orders'
    })
  },
  async mounted () {
    this.loading = true
    this.error = false

    try {
      await this.getOrders({
        filterByFormula: airQuery()
          .notIn('Client Rec ID', TEST_CLIENT_IDS)
          .todayOrAfter('Date')
          .before('Date', this.$moment().add('days', 28).format('MM/DD/YYYY'))
          .get(),
        sort: [{ field: 'Date', direction: 'asc' }]
      })

      await this.getClients({
        filterByFormula: airQuery().whereInId(this.orders.map(order => order.fields.order)).get()
      })
    } catch (error) {
      console.error(error)
      this.error = true
    }

    this.loading = false
  },
  methods: {
    ...mapActions({
      getClients: 'entities/clients/get',
      getOrders: 'entities/orders/get',
      updateSelectedClientTypes: 'upcoming-orders/updateSelectedClientTypes'
    }),
    onClientTypesFilterChange (v) {
      this.updateSelectedClientTypes(v)
    },
    formatDate (date) {
      return moment(date).format('ddd, M/DD')
    }
  }
}
</script>
