<template>
  <div class="upcoming-orders">
    <h1 class="upcoming-orders__title">
      Upcoming Orders
    </h1>
    <div class="upcoming-orders__client-type">
      <ClientTypeFilter v-model="selectedClientTypes" :options="clientTypes" />
    </div>
    <div class="upcoming-orders__content">
      <div v-for="date in Object.keys(filteredOrders)" :key="date" class="upcoming-orders__content__day">
        <div class="upcoming-orders__content__day__title">
          <h1 class="upcoming-orders__content__day__title__date">
            <mark>{{ formatDate(date) }}</mark>
          </h1>
          <h2 class="upcoming-orders__content__day__title__orders">
            {{ calculateTotalOrders(filteredOrders[date]) }} orders
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
            <div v-for="client in filteredOrders[date]" :key="`${client[0]['Rec ID']}-${date}`" class="upcoming-orders__content__day__table__body__row">
              <p> {{ client[0]['Ready Time'] }} </p>
              <p> {{ client[0]['Summed Orders'] }} </p>
              <div v-if="client[0]['Temperature'] == 'Hot'" class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/warm.svg" alt="warm">
                <span>Warm</span>
              </div>
              <div v-else-if="client[0]['Temperature'] == 'Room Temperature'" class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/thermometer.svg" alt="room">
                <span>Room Temp</span>
              </div>
              <div v-else-if="client[0]['Temperature'] == 'Chilled'" class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/cold.svg" alt="cold">
                <span>Cold</span>
              </div>
              <div v-else class="upcoming-orders__content__day__table__body__row__inline" />
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img v-if="client[0]['Delivery Type'] == 'Delivery'" src="~/assets/icons/truck.svg" class="w-10 h-10" >
                <img v-if="client[0]['Delivery Type'] == 'Pickup'" src="~/assets/icons/user-check.svg" class="w-10 h-10" >
              </div>
              <p>{{ client[0].client.Name }}</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery !hidden">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UpcomingOrders',
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
      selectedClientTypes: []
    }
  },
  computed: {
    ...mapGetters({
      upcomingOrders: 'upcoming-orders/getUpcomingOrders',
      filteredOrders: 'upcoming-orders/getFilteredOrders'
    })
  },
  watch: {
    selectedClientTypes () {
      this.filterOrdersByClientType(this.selectedClientTypes)
    }
  },
  mounted () {
    this.getUpcomingOrders()
  },
  methods: {
    ...mapActions('upcoming-orders', ['getUpcomingOrders', 'filterOrdersByClientType']),
    formatDate (date) {
      return moment(date).format('ddd, M/DD')
    },
    calculateTotalOrders (orders) {
      return Object.values(orders).length
    }
  }
}
</script>

<style>

</style>
