<template>
  <div class="mb-20 lg:m-0">
    <Actions @add-default-order="addDefaultOrder" @clear="reset" />
    <div v-for="(group, groupName) in groupedItems" :key="groupName" class="mt-10">
      <p class="uppercase text-base text-green-500 font-bold">{{ groupName }}</p>
      <div class="md:flex justify-between flex-wrap gap-x-1 mt-3">
        <div v-for="product in group.items" :key="product.id" class="item">
          <div :class="{'bg-gray-200': !product.logo}" class="icon">
            <img v-if="product.logo" :src="product.logo" />
          </div>
          <strong class="title">{{ product.name }}</strong>
          <QuantityInput v-model="quantities[product.id]" @change="onProductQtyChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuantityInput from '@/components/order-form/fields/products/QuantityInput'
import Actions from '@/components/order-form/fields/products/Actions'

export default {
  components: {
    QuantityInput,
    Actions
  },
  data () {
    return {
      quantities: {}
    }
  },
  computed: {
    ...mapGetters({
      products: 'entities/products/products',
      fields: 'order-form/fields'
    }),
    groupedItems () {
      const groupedItems = {}

      this.products.forEach((product) => {
        const item = {
          id: product.id,
          name: product.fields.Name,
          logo: null
        }
        const itemType = product.fields['Product Type'].trim()

        if (product.fields.Logo && product.fields.Logo.length) {
          item.logo = product.fields.Logo[0].thumbnails.small.url
        }

        if (!groupedItems[itemType]) {
          groupedItems[itemType] = { items: [] }
        }

        groupedItems[itemType].items.push(item)
      })

      return groupedItems
    }
  },
  methods: {
    ...mapActions({
      updateFields: 'order-form/updateFields'
    }),
    onProductQtyChange () {
      this.updateFields({
        quantities: { ...this.quantities }
      })
    },
    addDefaultOrder (quantities) {
      for (const prodId in quantities) {
        if (!this.quantities[prodId]) this.quantities[prodId] = 0

        this.quantities[prodId] += quantities[prodId]
      }

      this.onProductQtyChange()
      this.$forceUpdate()
    },
    reset () {
      for (const prodId in this.quantities) {
        this.quantities[prodId] = 0
      }

      this.onProductQtyChange()
      this.$forceUpdate()
    }
  },
  mounted () {
    if (this.fields.quantities) {
      this.quantities = { ...this.fields.quantities }
    }
  }
}
</script>

<style scoped>
.item {
  @apply flex items-center justify-between py-3 border-y border-gray-200 relative text-sm;
  width: 100%;
}

.icon {
  @apply rounded-full w-5 h-5 text-sm;
}

.title {
  @apply ml-2 flex-1 pr-3;
}

@media (min-width: 768px) {
  .item {
    width: 46%;
  }
}
</style>
