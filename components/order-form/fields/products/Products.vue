<template>
  <div>
    <Actions @add-default-order="addDefaultOrder" @clear="reset" />
    <div class="flex justify-between flex-wrap gap-x-1 mt-2">
      <div v-for="product in formattedProducts" :key="product.id" class="item">
        <div :class="{'bg-gray-200': !product.logo}" class="icon">
          <img v-if="product.logo" :src="product.logo" />
        </div>
        <strong class="title">{{ product.name }}</strong>
        <QuantityInput v-model="quantities[product.id]" @change="onProductQtyChange" />
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
    formattedProducts () {
      return this.products.map((product) => {
        const item = {
          id: product.id,
          name: product.fields.Name,
          logo: null
        }

        if (product.fields.Logo && product.fields.Logo.length) {
          item.logo = product.fields.Logo[0].thumbnails.small.url
        }

        return item
      })
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
  width: 46%;
}

.icon {
  @apply rounded-full w-5 h-5 text-sm;
}

.title {
  @apply ml-2 flex-1 pr-3;
}
</style>
