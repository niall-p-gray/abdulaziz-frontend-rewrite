<template>
  <div class="mx-auto">
    <WeeklyOrderTable :orders="selectedWeekProductOrders" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeeklyOrderTable from '@/components/client-ordering-page/desktop/WeeklyOrderTable'

export default {
  components: {
    WeeklyOrderTable
  },
  computed: {
    ...mapGetters({
      selectedWeekProductOrders: 'weekly-client-orders/selectedWeekProductOrders'
    })
  }
}
</script>
