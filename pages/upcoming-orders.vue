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
            <div v-for="order in orders" :key="order.id" class="order">
              <div class="cell time lg:order-1">
                <div class="title">Ready time</div>
                <div class="value">{{ order.readyTime ? order.readyTime : '---' }}</div>
              </div>
              <div class="cell time lg:order-2">
                <div class="title">Delivery time</div>
                <div class="value">{{ order.deliveryTime ? order.deliveryTime : '---' }}</div>
              </div>
              <div class="cell qty lg:order-3">
                <div class="title">#</div>
                <div class="value">{{ order.qty }}</div>
              </div>
              <div class="cell temperature lg:order-4">
                <div class="title">Temperature</div>
                <div class="value">
                  <div v-if="order.temperature" class="flex items-center">
                    <img v-if="order.temperature.toLowerCase() === 'hot'" src="~/assets/icons/warm.svg" >
                    <img v-if="order.temperature.toLowerCase() === 'room temperature'" src="~/assets/icons/thermometer.svg" >
                    <img v-if="order.temperature.toLowerCase() === 'chilled'" src="~/assets/icons/cold.svg" >

                    <span class="ml-3">{{ formatTemp(order.temperature) }}</span>
                  </div>
                  <div v-else>---</div>
                </div>
              </div>
              <div class="cell packaging lg:order-5">
                <div class="title">Packaging</div>
                <div class="value">{{ order.packaging ? order.packaging : '---'}}</div>
              </div>
              <div class="cell delivery lg:order-6">
                <div class="title">Delivery</div>
                <div class="value">
                  <div v-if="order.deliveryType" class="flex items-center">
                    <img v-if="order.deliveryType.toLowerCase() === 'delivery'" src="~/assets/icons/truck.svg" >
                    <img v-if="order.deliveryType.toLowerCase() === 'pickup'" src="~/assets/icons/user-check.svg" >
                  </div>
                  <div v-else>---</div>
                </div>
              </div>
              <div class="cell client lg:order-7">
                <div class="title">Client</div>
                <div class="value">
                  <div class="flex justify-between items-center">
                    <div>
                      <p>{{ order.clientName }}</p>
                      <p v-if="order.clientDetails" class="text-sm font-normal">{{ order.clientDetails }}</p>
                    </div>
                    <img src="~/assets/icons/pen.svg" class="cursor-pointer edit-btn" >
                  </div>
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
    },
    formatTemp (temperature) {
      if (temperature === 'Hot') return 'Warm'
      if (temperature === 'chilled') return 'Cold'
      if (temperature === 'Room Temperature') return 'Room Temp'

      return temperature
    }
  }
}
</script>
