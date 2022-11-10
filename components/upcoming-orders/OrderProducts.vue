<template>
  <div class="mt-4">
    <h4 class="text-sm mb-4">Products</h4>
    <div v-for="product in products" :key="product.id" class="item">
      <div class="icon">
        <img v-if="product.logo" :src="product.logo" />
      </div>
      <div class="ml-2 text-sm">
        <strong>{{ product.name }}</strong>
        <p class="text-sm text-gray-500">{{ product.description }}</p>
      </div>
      <div class="flex-1 text-right">
        <span class="text-xl font-bold">#{{ product.qty }}</span>
      </div>
    </div>
    <div class="mt-4 flex font-bold justify-between">
      <span>Day total</span>
      <span class="text-xl">#{{ total }}</span>
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
              description: product.fields.Description,
              qty: orderItem.fields.Orders,
              logo: null,
              displayOrder: product.fields['Display Order']
            }

            if (product.fields.Logo && product.fields.Logo.length) {
              newEntry.logo = product.fields.Logo[0].thumbnails.small.url
            }

            entries.push(newEntry)
          }
        }
      }

      return entries.sort((a, b) => a.displayOrder - b.displayOrder)
    },
    total () {
      return this.products.reduce((qty, p) => qty + p.qty, 0)
    }
  }
}
</script>

<style scoped>
.item {
  @apply flex items-center mt-3;
}

.icon {
  @apply rounded-full w-7 h-7 bg-gray-200 text-sm;
}

h4 {
  color: #c4c4c4;
}
</style>
