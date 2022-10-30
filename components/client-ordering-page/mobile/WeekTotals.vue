<template>
  <div>
    <div class="item">
      <div class="label">Day Total</div>
      <div class="value">{{ selectedWeekDailyTotalOrders[selectedDay] }}</div>
    </div>
    <div class="item week">
      <div class="label">Week Total</div>
      <div class="value">{{ selectedWeekTotalOrders }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  props: {
    selectedDay: {
      validator: ddmmyyDateValidator,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      selectedWeekDailyTotalOrders: 'weekly-client-orders/selectedWeekDailyTotalOrders',
      selectedWeekTotalOrders: 'weekly-client-orders/selectedWeekTotalOrders'
    })
  }
}
</script>

<style scoped>
.item {
  @apply flex justify-between items-center border border-gray-300 font-bold;
}

.item.week {
 background: #f2f2ed;
}

.label {
  @apply flex flex-1 items-center p-2 bg-none;
}

.value {
  @apply bg-yellow w-14 h-14 flex justify-center items-center;
}
</style>
