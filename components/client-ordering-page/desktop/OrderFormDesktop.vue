<template>
  <div class="mx-auto">
    <WeeklyOrderTable :orders="selectedWeekProductOrders" :selected-week="selectedWeek" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeeklyOrderTable from '@/components/client-ordering-page/desktop/WeeklyOrderTable'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  components: {
    WeeklyOrderTable
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
    selectedWeekProductOrders () {
      const productOrders = this.products.map((product) => {
        const entry = {
          id: product.id,
          name: product.fields.Name,
          description: product.fields.Description,
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
          const weekDay = selectedWeekStart.isoWeekday(i + 1).format('DD-MM-YYYY')
          entry.weekDayOrders[weekDay] = { qty: 0 }
        })

        entry.totalWeekOrders = 0 // This product’s cumulative orders for currently selected week

        return entry
      })

      // Loop through selected week’s orders and finish populating totalWeekOrders & weekDayOrders properties
      // of each product in productOrders array
      for (let index = 0; index < this.orderItems.length; index++) {
        const order = this.orderItems[index]
        const orderDate = this.$moment(order.fields['Order Date'], 'YYYY-MM-DD').format('DD-MM-YYYY')

        const productOrder = productOrders.find(product => product.id === order.fields.Product[0])
        const productOrderIndex = productOrders.indexOf(productOrder)

        if (productOrder && productOrder.weekDayOrders[orderDate]) {
          productOrder.weekDayOrders[orderDate].qty += order.fields.Orders
          productOrder.totalWeekOrders += order.fields.Orders

          productOrders.splice(productOrderIndex, 1, productOrder)
        }
      }

      return productOrders
    }
  }
}
</script>
