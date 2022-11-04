<template>
  <div class="item">
    <div class="icon">
      <img v-if="product.logo" :src="product.logo" />
    </div>
    <strong class="title">{{ product.name }}</strong>
    <DailyOrderQuantityInput
      v-if="selectedday && product.weekDayOrders[selectedday]"
      :qty="product.weekDayOrders[selectedday].qty"
      :day="selectedday"
      :product="product"
      :show-buttons="true"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DailyOrderQuantityInput from '@/components/client-ordering-page/DailyOrderQuantityInput'

export default {
  components: {
    DailyOrderQuantityInput
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      selectedWeek: 'weekly-client-orders/selectedWeek',
      selectedday: 'weekly-client-orders/selectedDay'
    })
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
