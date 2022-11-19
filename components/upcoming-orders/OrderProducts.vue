<template>
  <div class="mt-4">
    <h4 class="text-sm mb-2 md:mb-4">Products</h4>
    <div v-for="product in products" :key="product.id" class="flex items-center">
        <span>{{ product.qty }}</span>
        <span class="ml-2">{{ product.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      allOrderItems: 'entities/order-items/orderItems',
      allProducts: 'entities/products/products'
    }),
    products () {
      const entries = []

      for (let index = 0; index < this.allProducts.length; index++) {
        const product = this.allProducts[index]

        for (let index = 0; index < this.allOrderItems.length; index++) {
          const orderItem = this.allOrderItems[index]

          if (orderItem.fields.Order[0] !== this.order.id) continue
          if (orderItem.fields.Product[0] !== product.id) continue

          const entry = entries.find(ent => ent.id === product.id)

          if (entry) {
            entry.qty += orderItem.fields.Orders
            const entryIndex = entries.indexOf(entry)
            entries.splice(entryIndex, 1, entry)
          } else {
            const newEntry = {
              id: product.id,
              name: product.fields.Name,
              qty: orderItem.fields.Orders,
              displayOrder: product.fields['Display Order']
            }

            entries.push(newEntry)
          }
        }
      }

      return entries.sort((a, b) => a.displayOrder - b.displayOrder)
    }
  }
}
</script>

<style scoped>
h4 {
  color: #c4c4c4;
}
</style>
