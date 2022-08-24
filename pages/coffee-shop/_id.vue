<template>
  <div class="main title-text order">
    <div class="container !pt-36 !w-10/12">
      <h1 class="order__title">
        Niall - FOR TESTING <span class="text-4xl">NPG</span>
      </h1>
      <div class="order__date">
        <div>
          <div class="order__date__title">
            <span>Past Orders</span>
          </div>
          <div class="order__date__grid">
            <div
              v-for="(date, index) in pastDates"
              :key="`pd-${index}`"
              class="chip"
              :class="selectedDate == formatDate(date.date, 'MM/DD/YY') ? 'chip-selected' : ''"
              @click="selectedDate = formatDate(date.date, 'MM/DD/YY')"
            >
              <span>{{ date.text }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="order__date__title">
            <span>Upcoming Orders</span>
          </div>
          <div class="order__date__grid !grid-cols-4">
            <div
              v-for="(date, index) in futureDates"
              :key="`fd-${index}`"
              class="chip"
              :class="selectedDate == formatDate(date.date, 'MM/DD/YY') ? 'chip-selected' : ''"
              @click="selectedDate = formatDate(date.date, 'MM/DD/YY')"
            >
              <span>{{ date.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <order-table v-if="filteredProducts.length > 0 && !loading" :items="filteredProducts" :selected-date="selectedDate" />
        <loading v-else class="justify-center flex w-full" />
      </div>
      <div class="order__actions">
        <button class="btn mr-2" :class="saveEnabled ? '' : 'btn__disabled'" @click="updateOrdersLocal">
          Save Order
        </button>
        <button class="btn ml-2" :class="saveEnabled ? 'btn__disabled' : ''" @click="saveEnabled = true">
          Make Standing Order
        </button>
      </div>
      <div class="order__instructions">
        <h3 class="order__instructions__title">
          Instructions
        </h3>
        <ul class="order__instructions__list list-disc w-2/5 mx-auto">
          <li class="text-light">
            Enter the # of each kolache you want for each day
          </li>
          <li class="text-light">
            Click 'Save Orders' to update your upcoming orders
          </li>
          <li class="">
            <b>
              Click 'Save Orders' to update your upcoming orders
            </b>
          </li>
        </ul>
        <p class="order__instructions__subtitle">
          Note: Red fields mean that the ordering window has closed for that day - if you need to update it, please text or call us directly! 😊😊😊
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CoffeeShopOrder',
  components: {
    OrderTable: () => import('@/components/orderPage/OrderTable'),
    Loading: () => import('@/components/layout/Loading')
  },
  data () {
    return {
      pastDates: [],
      futureDates: [],
      selectedDate: null,
      saveEnabled: false
    }
  },
  computed: {
    ...mapGetters({
      products: 'order/getProducts',
      selectedClient: 'order/getSelectedClient',
      selectedOrders: 'order/getSelectedOrders',
      loading: 'order/getLoading'
    }),
    filteredProducts () {
      return this.selectedClient['Chosen Products'] ? this.products.filter(product => this.selectedClient['Chosen Products'].includes(product.id)) : []
    }
  },
  watch: {
    async selectedDate (newDate) {
      try {
        await this.getProducts({
          clientName: this.selectedClient.Name,
          selectedDate: this.selectedDate,
          clientId: this.selectedClient['Rec ID']
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    const startOfWeek = moment.tz('America/Chicago').startOf('isoWeek')
    this.pastDates = [
      {
        date: startOfWeek.clone().subtract(21, 'days'),
        text: startOfWeek.clone().subtract(21, 'days').format('M/DD')
      },
      {
        date: startOfWeek.clone().subtract(14, 'days'),
        text: startOfWeek.clone().subtract(14, 'days').format('M/DD')
      },
      {
        date: startOfWeek.clone().subtract(7, 'days'),
        text: startOfWeek.clone().subtract(7, 'days').format('M/DD')
      }
    ]
    this.futureDates = [
      {
        date: startOfWeek,
        text: startOfWeek.clone().format('M/DD')
      },
      {
        date: startOfWeek.clone().add(7, 'days'),
        text: startOfWeek.clone().add(7, 'days').format('M/DD')
      },
      {
        date: startOfWeek.clone().add(14, 'days'),
        text: startOfWeek.clone().add(14, 'days').format('M/DD')
      },
      {
        date: startOfWeek.clone().add(21, 'days'),
        text: startOfWeek.clone().add(21, 'days').format('M/DD')
      }
    ]
    try {
      await this.getClient(this.$route.params.id)
      this.selectedDate = startOfWeek.clone().format('MM/DD/YY')
      await this.getProducts({
        clientName: this.selectedClient.Name,
        selectedDate: this.selectedDate,
        clientId: this.selectedClient['Rec ID']
      })
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions('order', ['getProducts', 'getClient', 'getClientOrders', 'updateOrders']),
    formatDate (date, format) {
      return moment.tz(date, 'America/Chicago').format(format)
    },
    async updateOrdersLocal () {
      try {
        await this.updateOrders()
        await this.getProducts({
          clientName: this.selectedClient.Name,
          selectedDate: this.selectedDate,
          clientId: this.selectedClient['Rec ID']
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
