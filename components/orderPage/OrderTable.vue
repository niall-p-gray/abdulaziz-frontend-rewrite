<template>
  <div class="order__table">
    <table class="order__table__table">
      <thead class="order__table__table__head">
        <tr class="text-light">
          <th scope="col" class="order__table__table__head__th text-center">
            ITEM
          </th>
          <th scope="col" class="order__table__table__head__th">
            MON
          </th>
          <th scope="col" class="order__table__table__head__th">
            TUE
          </th>
          <th scope="col" class="order__table__table__head__th">
            WED
          </th>
          <th scope="col" class="order__table__table__head__th">
            THU
          </th>
          <th scope="col" class="order__table__table__head__th">
            FRI
          </th>
          <th scope="col" class="order__table__table__head__th">
            SAT
          </th>
          <th scope="col" class="order__table__table__head__th">
            SUN
          </th>
          <th scope="col" class="order__table__table__head__th">
            TOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="index" class="order__table__table__tr">
          <td scope="row" class="order__table__table__tr__td">
            <p class="font-semibold text-black">
              {{ item.fields.Name }}
            </p>
            <div class="font-light">
              <span>
                {{ item.fields.Description }},
              </span>
            </div>
          </td>
          <template v-if="item.weeklyOrders">
            <td v-for="(order, orderIndex) in item.weeklyOrders" :key="`order-${orderIndex}`" class="order__table__table__tr__weekly-orders">
              <input :value="order" type="text" @input="orderChanged(index, orderIndex, $event.target.value)">
            </td>
            <td class="text-center">
              <span class="order__table__table__tr__total">{{ addOrders(item.weeklyOrders) }}</span>
            </td>
          </template>
        </tr>
        <tr class="order__table__table__tr">
          <td class=" px-4 py-2" colspan="7">
            <span class="order__table__table__tr__edited">
              Last Edited: 7/7 12:17
            </span>
          </td>
          <td class=" px-4 py-2 text-center">
            <span class="order__table__table__tr__total">
              Totals:
            </span>
          </td>
          <td class=" px-4 py-2 text-center">
            <span class="order__table__table__tr__all-orders">
              {{ allOrdersTotal }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OrderTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      orders: []
    }
  },
  computed: {
    ...mapGetters({
      changedOrders: 'order/getChangedOrders'
    }),
    allOrdersTotal () {
      let total = 0
      this.orders.forEach((item) => {
        if (item.weeklyOrders) {
          total += this.addOrders(item.weeklyOrders)
        }
      })
      return total
    }
  },
  watch: {
    items (newItems) {
      this.orders = newItems
    }
  },
  mounted () {
    this.orders = JSON.parse(JSON.stringify(this.items))
  },
  methods: {
    ...mapMutations({
      setChangedOrders: 'order/setChangedOrders'
    }),
    getDayOfWeek (date) {
      return moment.tz(date, 'America/Chicago').day()
    },
    addOrders (orders) {
      return _.sum(orders)
    },
    orderChanged (itemIndex, orderIndex, value) {
      const localChangedOrders = this.changedOrders
      const changedDay = moment.tz('America/Chicago').startOf('isoWeek').add(orderIndex, 'days').format('YYYY-MM-DD')
      this.orders[itemIndex].weeklyOrders[orderIndex] = parseInt(value)
      const orderId = this.orders[itemIndex].orders.filter(order => order.date === changedDay)[0].id
      localChangedOrders[orderId] = this.orders[itemIndex].weeklyOrders[orderIndex]
      this.setChangedOrders(localChangedOrders)
    }
  }
}
</script>

<style>

</style>
