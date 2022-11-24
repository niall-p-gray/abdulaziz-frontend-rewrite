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
            :product="product"
          />
        </td>
        <td class="total">{{ product.totalWeekOrders }}</td>
      </tr>
      <tr class="total">
        <td colspan="2" class="!text-left">Day Totals</td>
        <td v-for="(qty, date) in selectedWeekDailyTotalOrders" :key="date">{{ qty }}</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="6" class="edit-date">
          <WeekOrdersLastEditDate />
        </td>
        <td colspan="3" class="total !text-left">Totals</td>
        <td class="total !bg-yellow">{{ selectedWeekTotalOrders }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import { weekDayNames } from '@/utils'
import DailyOrderQuantityInput from '@/components/client-weekly-orders/DailyOrderQuantityInput'
import WeekOrdersLastEditDate from '@/components/client-weekly-orders/WeekOrdersLastEditDate'

export default {
  components: {
    DailyOrderQuantityInput,
    WeekOrdersLastEditDate
  },
  props: {
    orders: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      selectedWeekDailyTotalOrders: 'weekly-client-orders/selectedWeekDailyTotalOrders',
      selectedWeekTotalOrders: 'weekly-client-orders/selectedWeekTotalOrders'
    }),
    weekDayNames () {
      return weekDayNames().map(name => name.substring(0, 3))
    }
  }
}
</script>
