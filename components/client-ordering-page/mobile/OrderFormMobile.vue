<template>
  <div>
    <WeekDaySelector v-model="selectedDate" />
    <div class="mt-12">
      <div>
        <div v-for="product in selectedWeekProductOrders" :key="product.id" class="item">
          <div class="icon">
            <img v-if="product.logo" :src="product.logo" />
          </div>
          <strong class="title">{{ product.name }}</strong>
          <DailyOrderQuantityInput
            v-if="selectedDate && product.weekDayOrders[selectedDate]"
            :qty="product.weekDayOrders[selectedDate].qty"
            :day="selectedDate"
            :product-id="product.id"
            :show-buttons="true"
          />
        </div>
      </div>
      <WeekTotals v-if="selectedDate" :selected-day="selectedDate" class="mt-6" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeekDaySelector from '@/components/client-ordering-page/mobile/WeekDaySelector'
import WeekTotals from '@/components/client-ordering-page/mobile/WeekTotals'
import DailyOrderQuantityInput from '@/components/client-ordering-page/DailyOrderQuantityInput'

export default {
  components: {
    WeekDaySelector,
    DailyOrderQuantityInput,
    WeekTotals
  },
  data () {
    return {
      selectedDate: null
    }
  },
  computed: {
    ...mapGetters({
      selectedWeekProductOrders: 'weekly-client-orders/selectedWeekProductOrders'
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
