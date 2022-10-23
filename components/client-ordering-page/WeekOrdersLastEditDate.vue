<template>
  <span>Last edited: {{ date }}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      orders: 'entities/orders/orders'
    }),
    date () {
      const lastEditedOrder = [...this.orders].sort((a, b) => {
        const dateA = this.$moment.utc(a.fields['Last Modified'])
        const dateB = this.$moment.utc(b.fields['Last Modified'])

        return dateA.isAfter(dateB)
      })[0]

      if (!lastEditedOrder) {
        return
      }

      return this.$moment.utc(lastEditedOrder.fields['Last Modified']).local().format('M/DD HH:mm')
    }
  }
}
</script>

<style>
span {
  @apply text-gray-600 italic block text-center lg:inline lg:text-left;
}
</style>
