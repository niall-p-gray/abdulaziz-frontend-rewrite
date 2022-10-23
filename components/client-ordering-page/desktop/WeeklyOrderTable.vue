<template>
  <table class="table table--edgeless w-full">
    <thead>
      <th></th>
      <th class="w-6/12">Product</th>
      <th v-for="(name, index) in weekDayNames" :key="index">{{ name }}</th>
      <th class="total">
        Totals
      </th>
    </thead>
    <tbody>
      <tr v-for="(product, index) in orders" :key="index">
        <td>
          <div class="rounded-full w-10 h-10 bg-gray-200">
            <img v-if="product.logo" :src="product.logo" />
          </div>
        </td>
        <td class="product-info">
          <div>
            <strong class="font-bold">{{ product.name }}</strong>
            <p>{{ product.description }}</p>
          </div>
        </td>
        <td v-for="(order, day) in product.weekDayOrders" :key="day">
          <DailyOrderQuantityInput
            :qty="order.qty"
            :day="day"
            :product-id="product.id"
          />
        </td>
        <td class="total">{{ product.totalWeekOrders }}</td>
      </tr>
      <tr class="total">
        <td colspan="2" class="!text-left">Day Totals</td>
        <td v-for="(qty, date) in dailyTotalOrders" :key="date">{{ qty }}</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="6" class="edit-date">
          <WeekOrdersLastEditDate :week="selectedWeek" />
        </td>
        <td colspan="3" class="total !text-left">Totals</td>
        <td class="total !bg-yellow">{{ selectedWeekTotalOrders }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { weekDayNames } from '@/utils'
import { ddmmyyDateValidator } from '@/utils/prop-validators'
import DailyOrderQuantityInput from '@/components/client-ordering-page/DailyOrderQuantityInput'
import WeekOrdersLastEditDate from '@/components/client-ordering-page/WeekOrdersLastEditDate'

export default {
  components: {
    DailyOrderQuantityInput,
    WeekOrdersLastEditDate
  },
  props: {
    selectedWeek: {
      required: true,
      validator: ddmmyyDateValidator
    },
    orders: {
      required: true,
      type: Array
    }
  },
  computed: {
    weekDayNames () {
      return weekDayNames().map(name => name.substring(0, 3))
    },
    // Aggregated orders for each day of the selected week, across all products
    dailyTotalOrders () {
      const dailyOrders = {}

      for (let index = 0; index < this.orders.length; index++) {
        const productOrder = this.orders[index]

        for (const date in productOrder.weekDayOrders) {
          const order = productOrder.weekDayOrders[date]

          if (dailyOrders[date]) {
            dailyOrders[date] += order.qty
          } else {
            dailyOrders[date] = order.qty
          }
        }
      }

      return dailyOrders
    },
    selectedWeekTotalOrders () {
      let total = 0

      for (const key in this.dailyTotalOrders) {
        total += this.dailyTotalOrders[key]
      }

      return total
    }
  }
}
</script>
