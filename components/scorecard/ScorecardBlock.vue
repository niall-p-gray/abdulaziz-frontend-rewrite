<template>

  <table class="scorecard-table">
    <tr>
      <td colspan="2">
        <h1 class="text-2xl text-center mb-6 mt-6"><span class="custom-underline">Kolaches ordered</span></h1>
      </td>
      <td colspan="2">
        <h1 class="text-2xl text-center mb-6 mt-6"><span class="custom-underline">Orders</span></h1>
      </td>
    </tr>
    <tr class="scorecard-table-row" v-for="(clientGroupedOrder, index) in ordersGroupedByClientType.clientOrders"
      :key="index">
      <td class="scorecard-table-col-1">{{ clientGroupedOrder.clientType }}</td>
      <td class="scorecard-table-col-2">{{ clientGroupedOrder.orderSums }}</td>
      <td class="scorecard-table-col-3">{{ clientGroupedOrder.clientType }}</td>
      <td class="scorecard-table-col-4">{{ clientGroupedOrder.orderCounts }}</td>
    </tr>
    <tr>
      <td></td>
      <td class="scorecard-table-col-2"><b>{{ ordersGroupedByClientType.orderSums }}</b></td>
      <td></td>
      <td class="scorecard-table-col-4"><b>{{ ordersGroupedByClientType.orderCounts }}</b></td>
    </tr>
  </table>

</template>

<script>
export default {
  props: {
    ordersGroupedByClientType: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-underline {
  border-bottom: 1px solid #F9ED70;
  box-shadow: 0px -12px 0px #F9ED70 inset;
}

.scorecard-table {
  @apply table m-auto mt-4;
}

.scorecard-table-row {
  @apply table-row;
}

.scorecard-table-col-1 {
  @apply table-cell px-12 text-left;
}

.scorecard-table-col-2 {
  @apply table-cell px-12 border-r-8 border-gray-600 text-left;
}

.scorecard-table-col-3 {
  @apply table-cell px-12 border-l-8 border-gray-600 text-left;
}

.scorecard-table-col-4 {
  @apply table-cell px-12 text-left;
}
</style>