<template>
  <div class="order-page">
    <portal to="page-title">Client Ordering Page</portal>
    <div>
      <PastAndUpcomingOrderDates />
      <OrderFormDesktop class="mt-16" />
    </div>
  </div>
</template>

<script>
import PastAndUpcomingOrderDates from '@/components/client-ordering-page/PastAndUpcomingOrderDates'
import OrderFormDesktop from '@/components/client-ordering-page/OrderFormDesktop'

export default {
  layout: 'dashboard',
  components: {
    PastAndUpcomingOrderDates,
    OrderFormDesktop
  }
}
</script>
