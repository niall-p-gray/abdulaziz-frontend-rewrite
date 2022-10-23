<template>
  <div>
    <WeekDaySelector v-model="selectedDate" :week="selectedWeek" />
    <div class="mt-12">
      <div>
        <div v-for="product in productOrders" :key="product.id" class="item">
          <div class="icon">
            <img v-if="product.logo" :src="product.logo" />
          </div>
          <strong class="title">{{ product.name }}</strong>
          <DailyOrderQuantityInput
            :qty="product.qtyForSelectedDay"
            :day="selectedDate"
            :product-id="product.id"
            :show-buttons="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeekDaySelector from '@/components/client-ordering-page/mobile/WeekDaySelector'
import DailyOrderQuantityInput from '@/components/client-ordering-page/DailyOrderQuantityInput'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  components: {
    WeekDaySelector,
    DailyOrderQuantityInput
  },
  props: {
    selectedWeek: {
      required: true,
      validator: ddmmyyDateValidator
    }
  },
  data () {
    return {
      selectedDate: this.selectedWeek
    }
  },
  computed: {
    ...mapGetters({
      products: 'entities/products/products',
      orders: 'entities/orders/orders',
      orderItems: 'entities/order-items/orderItems'
    }),
    // Returns orders per product for the selected day
    productOrders () {
      const products = this.products.map((product) => {
        const entry = {
          id: product.id,
          name: product.fields.Name,
          description: product.fields.Description,
          logo: null,
          qtyForSelectedDay: 0
        }

        if (product.fields.Logo && product.fields.Logo.length) {
          entry.logo = product.fields.Logo[0].thumbnails.small.url
        }

        return entry
      })

      this.orderItems.forEach((order) => {
        const orderDate = this.$moment(order.fields['Order Date'], 'YYYY-MM-DD').format('DD-MM-YYYY')

        if (orderDate !== this.selectedDate) {
          return
        }

        const product = products.find(product => product.id === order.fields.Product[0])
        const productIndex = products.indexOf(product)

        if (product) {
          product.qtyForSelectedDay += order.fields.Orders
          products.splice(productIndex, 1, product)
        }
      })

      return products
    }
  }
}
</script>

<style scoped>
.item {
  @apply flex items-center justify-between py-3 border-y border-gray-300;
}

.icon {
  @apply rounded-full w-7 h-7 bg-gray-200 text-sm;
}

.title {
  @apply ml-2 underline flex-1;
}
</style>
