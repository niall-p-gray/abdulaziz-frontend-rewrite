<template>
  <div>
    <WeekDaySelector />
    <div class="mt-12">
      <div>
        <InlineProducDetails
        v-for="product in selectedWeekProductOrders"
        :key="product.id"
        :product="product"
        />
      </div>
      <WeekTotals class="mt-6" />
      <WeekOrdersLastEditDate class="mt-8" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeekDaySelector from '@/components/client-weekly-orders/mobile/WeekDaySelector'
import WeekTotals from '@/components/client-weekly-orders/mobile/WeekTotals'
import InlineProducDetails from '@/components/client-weekly-orders/mobile/InlineProducDetails'
import WeekOrdersLastEditDate from '@/components/client-weekly-orders/WeekOrdersLastEditDate'

export default {
  components: {
    WeekDaySelector,
    InlineProducDetails,
    WeekTotals,
    WeekOrdersLastEditDate
  },
  computed: {
    ...mapGetters({
      selectedWeekProductOrders: 'weekly-client-orders/selectedWeekProductOrders'
    })
  }
}
</script>
