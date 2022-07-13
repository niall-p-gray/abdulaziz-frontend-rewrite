<template>
  <div class="bg-primary min-h-screen title-text">
    <div class="container !pt-36 !w-10/12">
      <h1 class="text-3xl title-text">
        Niall - FOR TESTING <span class="text-4xl">NPG</span>
      </h1>
      <div class="w-1/2 mt-10 grid grid-cols-2 text-center mx-auto gap-3">
        <div class="">
          <div class="text-center border-b-red-500 border-b-2">
            <span class="text-red-500 text-lg title-text">Past Orders</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-center mx-auto justify-center mt-2 w-5/6">
            <div v-for="(date, index) in pastDates" :key="`pd-${index}`" class="chip">
              <span>{{ date }}</span>
            </div>
          </div>
        </div>
        <div class="">
          <div class="text-center border-b-red-500 border-b-2">
            <span class="text-red-500 text-lg title-text">Upcoming Orders</span>
          </div>
          <div class="grid grid-cols-4 gap-2 text-center mx-auto justify-center mt-2 w-5/6">
            <div v-for="(date, index) in futureDates" :key="`fd-${index}`" class="chip">
              <span>{{ date }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <order-table :items="products" />
      </div>
      <div class="mt-10 w-1/2 mx-auto">
        <div class="grid-grid-cols-2 gap-5">
          <button class="btn btn__disabled mr-2">
            Save Order
          </button>
          <button class="btn ml-2">
            Make Standing Order
          </button>
        </div>
      </div>
      <div class="mt-10 rounded-xl bg-[#eeebcc] py-10 px-8">
        <h3 class="text-center text-2xl">
          Instructions
        </h3>
        <ul class="list-disc w-2/5 mx-auto">
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
        <p class="mt-2 font-light italic text-gray-400">
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
    OrderTable: () => import('@/components/orderPage/OrderTable')
  },
  data () {
    return {
      dateRanges: null,
      pastDates: [],
      futureDates: []
    }
  },
  computed: {
    ...mapGetters({
      products: 'order/getProducts'
    })
  },
  async mounted () {
    const startOfWeek = moment.tz('America/Chicago').startOf('isoWeek')
    this.pastDates = [startOfWeek.clone().subtract(14, 'days').format('M/DD'), startOfWeek.clone().subtract(7, 'days').format('M/DD'), startOfWeek.clone().format('M/DD')]
    this.futureDates = [startOfWeek.clone().add(7, 'days').format('M/DD'), startOfWeek.clone().add(14, 'days').format('M/DD'), startOfWeek.clone().add(21, 'days').format('M/DD'), startOfWeek.clone().add(28, 'days').format('M/DD')]
    try {
      await this.getProducts()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions('order', ['getProducts']),
    getDateRanges () {
      let d = new Date()
      d = this.$moment.tz(d, 'America/Chicago').format('yyyy-MM-dd')
      const date = this.$moment(d)

      const today = this.$moment.tz(date, 'America/Chicago').format('yyyy-MM-dd')

      const day = date.day()
      console.log('date', day)

      let dayMinus
      let dateToUseDayMinus

      if (day === 0) {
        dayMinus = -6
        dateToUseDayMinus = 1
      } else if (day > 4) {
        dayMinus = 1 - day
        dateToUseDayMinus = 8 - day
      } else {
        dayMinus = 1 - day
        dateToUseDayMinus = 1 - day
      }

      const pastCutOff = date.add(dayMinus - 22, 'days')
      console.log('pastCutOff', date)
      const prevMonday = date.add(dayMinus, 'days')
      const futureCutOff = date.add(dayMinus + 22, 'days')
      const dateToUse = date.add(dateToUseDayMinus, 'days')
      const dateToUseDisplay = this.$moment.tz(dateToUse, 'America/Chicago').format('yyyy-MM-dd')

      const datesToOutputToSite = []
      for (let thisDate = -3; thisDate < 4; thisDate++) {
        const tempDate = date.add(dayMinus + (7 * thisDate), 'days')
        const tempDateISO = this.$moment.tz(tempDate, 'America/Chicago').format('yyyy-MM-dd')
        const tempDateDisplay = this.$moment.tz(tempDate, 'America/Chicago').format('M/d')

        let type
        if (thisDate > -1) {
          type = 'future'
        } else {
          type = 'past'
        }

        datesToOutputToSite.push({ iso: tempDateISO, display: tempDateDisplay, weekNo: thisDate, type })
      }

      return { today, pastCutOff, prevMonday, futureCutOff, dateToUse: dateToUseDisplay, datesToUseOnSite: datesToOutputToSite }
    }
  }
}
</script>

<style>

</style>
