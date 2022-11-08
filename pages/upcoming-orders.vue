<template>
  <div class="upcoming-orders">
    <h1 class="upcoming-orders__title">
      Upcoming Orders
    </h1>
    <div v-if="!loading && !error" >
      <div class="upcoming-orders__client-type">
        <ClientTypeFilter :options="clientTypes" @change="onClientTypesFilterChange" />
      </div>
      <div class="upcoming-orders__content">
        <div v-for="(orders, date) in upcomingOrderDates" :key="date" class="upcoming-orders__content__day">
          <div class="upcoming-orders__content__day__title">
            <h1 class="upcoming-orders__content__day__title__date">
              <mark>{{ formatDate(date) }}</mark>
            </h1>
            <h2 class="upcoming-orders__content__day__title__orders">
              {{ orders.length }} orders
            </h2>
          </div>
          <div class="upcoming-orders__content__day__table">
            <div class="upcoming-orders__content__day__table__head">
              <p>ready time</p>
              <p>#</p>
              <p>temp</p>
              <p>del</p>
              <p>client</p>
              <p />
            </div>
            <div class="upcoming-orders__content__day__table__body">
              <div v-for="order in orders" :key="order.id" class="upcoming-orders__content__day__table__body__row">
                <p> {{ order.readyTime }} </p>
                <p> {{ order.qty }} </p>
                <div v-if="order.temperature == 'Hot'" class="upcoming-orders__content__day__table__body__row__inline">
                  <img src="~/assets/icons/warm.svg" alt="warm">
                  <span>Warm</span>
                </div>
                <div v-else-if="order.temperature == 'Room Temperature'" class="upcoming-orders__content__day__table__body__row__inline">
                  <img src="~/assets/icons/thermometer.svg" alt="room">
                  <span>Room Temp</span>
                </div>
                <div v-else-if="order.temperature == 'Chilled'" class="upcoming-orders__content__day__table__body__row__inline">
                  <img src="~/assets/icons/cold.svg" alt="cold">
                  <span>Cold</span>
                </div>
                <div v-else class="upcoming-orders__content__day__table__body__row__inline" />
                <div class="upcoming-orders__content__day__table__body__row__delivery">
                  <img v-if="order.deliveryType == 'Delivery'" src="~/assets/icons/truck.svg" class="w-10 h-10" >
                  <img v-if="order.deliveryType == 'Pickup'" src="~/assets/icons/user-check.svg" class="w-10 h-10" >
                </div>
                <p>{{ order.clientName }}</p>
                <div class="upcoming-orders__content__day__table__body__row__delivery !hidden">
                  <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
                </div>
              </div>
            </div>
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

export default {
  components: {
    ClientTypeFilter: () => import('~/components/filters/ClientTypeFilter.vue')
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
