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
        <tr v-for="(product, index) in productWeekOrders" :key="index">
          <td>
            <div class="rounded-full w-10 h-10 bg-gray-200"></div>
          </td>
          <td class="product-info">
            <div>
              <strong class="font-bold">Product</strong>
              <p>Description</p>
            </div>
          </td>
          <td v-for="(order, index2) in product.weekDayOrders" :key="index2">
            <input type="text" :value="order.qty">
          </td>
          <td class="total">{{ product.totalWeekOrders }}</td>
        </tr>
        <tr class="total">
          <td colspan="2" class="!text-left">Day Totals</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="6" class="edit-date">Last edited: 10/15 11:55</td>
          <td colspan="3" class="total !text-left">Totals</td>
          <td class="total !bg-yellow">6</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    weekDayNames () {
      return this.$moment.weekdays().map(name => name.slice(0, 3).toUpperCase())
    },
    productWeekOrders () {
      return new Array(7).fill({
        name: 'Product name',
        description: 'description',
        weekDayOrders: {
          1: {
            qty: 8
          },
          2: {
            qty: 8
          },
          3: {
            qty: 8
          },
          4: {
            qty: 8
          },
          5: {
            qty: 8
          },
          6: {
            qty: 8
          },
          7: {
            qty: 8
          }
        },
        totalWeekOrders: 8 * 7
      })
    }
  }
}
</script>
