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
              <input :value="order.count" type="text" @input="orderChanged2(order, $event.target.value)">
            </td>
            <td class="text-center">
              <span class="order__table__table__tr__total">{{ addOrders(item.weeklyOrders) }}</span>
            </td>
          </template>
        </tr>
        <tr class="order__table__table__tr">
          <td class=" px-4 py-2" colspan="7">
            <span class="order__table__table__tr__edited">
              Last Edited: {{ lastEditedAt }}
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
    },
    selectedDate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      orders: []
    }
  },
  computed: {
    ...mapGetters({
      changedOrders: 'order/getChangedOrders',
      lastEditedAt: 'order/getOrderLastEditedAt'
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
      return _.sum(orders.map(order => parseInt(order.count)))
    },
    orderChanged (itemIndex, orderIndex, order, value) {
      this.orders[itemIndex].weeklyOrders[orderIndex].count = parseInt(value)
      order.count = value
      const localChangedOrders = JSON.parse(JSON.stringify(this.changedOrders))
      const changedDay = moment.tz(this.selectedDate, 'America/Chicago').add(orderIndex + 1, 'days').format('YYYY-MM-DD')
      if (this.orders[itemIndex].weeklyOrders[orderIndex].id) {
        console.log([...localChangedOrders, this.orders[itemIndex].weeklyOrders[orderIndex]])
        this.setChangedOrders([...localChangedOrders, this.orders[itemIndex].weeklyOrders[orderIndex]])
        console.log('setChangedOrders', this.changedOrders)
        // localChangedOrders.push(this.orders[itemIndex].weeklyOrders[orderIndex])
      } else {
        localChangedOrders.filter(order => order.day === changedDay).length > 0
          ? localChangedOrders.filter(order => order.day === changedDay)[0].count = parseInt(value)
          : localChangedOrders.push({
            day: changedDay,
            count: parseInt(value)
          })
      }
      this.setChangedOrders(localChangedOrders)
    },
    orderChanged2 (order, newValue) {
      const localChangedOrders = JSON.parse(JSON.stringify(this.changedOrders))
      if (localChangedOrders.filter(changedOrder => changedOrder.id === order.id).length === 0) {
        localChangedOrders.push({
          id: order.id,
          count: parseInt(newValue)
        })
      } else {
        localChangedOrders.filter(changedOrder => changedOrder.id === order.id)[0].count = parseInt(newValue)
      }
      this.setChangedOrders(localChangedOrders)
    }
  }
}
</script>

<style>

</style>
