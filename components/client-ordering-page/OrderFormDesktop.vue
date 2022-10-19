<template>
  <div class="mx-auto">
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
        <tr v-for="(product, index) in selectedWeekProductOrders" :key="index">
          <td>
            <div class="rounded-full w-10 h-10 bg-gray-200">
              <img v-if="product.logo" :src="product.logo">
            </div>
          </td>
          <td class="product-info">
            <div>
              <strong class="font-bold">{{ product.name }}</strong>
              <p>{{ product.description }}</p>
            </div>
          </td>
          <td v-for="(order, index2) in product.weekDayOrders" :key="index2">
            <input type="text" :value="order.qty">
          </td>
          <td class="total">{{ product.totalWeekOrders }}</td>
        </tr>
        <tr class="total">
          <td colspan="2" class="!text-left">Day Totals</td>
          <td v-for="(qty, date) in dailyTotalOrders" :key="date">{{ qty }}</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="6" class="edit-date"><WeekOrdersLastEditDate :week="selectedWeek" /></td>
          <td colspan="3" class="total !text-left">Totals</td>
          <td class="total !bg-yellow">{{ selectedWeekTotalOrders }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeekOrdersLastEditDate from '@/components/client-ordering-page/WeekOrdersLastEditDate'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  components: {
    WeekOrdersLastEditDate
  },
  props: {
    selectedWeek: {
      required: true,
      validator: ddmmyyDateValidator
    }
  },
  computed: {
    ...mapGetters({
      products: 'entities/products/products',
      orders: 'entities/orders/orders',
      orderItems: 'entities/order-items/orderItems'
    }),
    // Constructs and returns an array containing names of weekdays
    weekDayNames () {
      return Array.apply(null, Array(7)).map((_, index) => {
        return this.$moment(index, 'e').startOf('week').isoWeekday(index + 1).format('ddd')
      })
    },
    selectedWeekProductOrders () {
      const productOrders = this.products.map((product) => {
        const entry = {
          id: product.id,
          name: product.fields.Name,
          description: product.fields.Description,
          displayOrder: product.fields['Display Order'],
          logo: null
        }

        // // Some products may not have an icon/logo
        if (product.fields.Logo && product.fields.Logo.length) {
          entry.logo = product.fields.Logo[0].thumbnails.small.url
        }

        // Initialize week orders for this particular product, this will be populated with the correct quantities below
        entry.weekDayOrders = {}
        Array.apply(null, Array(7)).forEach((_, i) => {
          const selectedWeekStart = this.$moment(this.selectedWeek, 'DD-MM-YYYY')
          const weekDay = selectedWeekStart.isoWeekday(i + 1).format('YYYY-MM-DD')
          entry.weekDayOrders[weekDay] = { qty: 0 }
        })

        entry.totalWeekOrders = 0 // This product’s cumulative orders for currently selected week

        return entry
      })

      // Sort product orders according to displayOrder field
      productOrders.sort((a, b) => a.displayOrder - b.displayOrder)

      // Loop through selected week’s orders and finish populating totalWeekOrders & weekDayOrders properties
      // of each product in productOrders array
      for (let index = 0; index < this.orderItems.length; index++) {
        const order = this.orderItems[index]
        const orderDate = order.fields['Order Date']

        const productOrder = productOrders.find(product => product.id === order.fields.Product[0])
        const productOrderIndex = productOrders.indexOf(productOrder)

        if (productOrder && productOrder.weekDayOrders[orderDate]) {
          productOrder.weekDayOrders[orderDate].qty += order.fields.Orders
          productOrder.totalWeekOrders += order.fields.Orders

          productOrders.splice(productOrderIndex, 1, productOrder)
        }
      }

      return productOrders
    },
    // Aggregated orders for each day of the selected week, across all products
    dailyTotalOrders () {
      const dailyOrders = {}

      for (let index = 0; index < this.selectedWeekProductOrders.length; index++) {
        const productOrder = this.selectedWeekProductOrders[index]

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
