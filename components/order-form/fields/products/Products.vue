<template>
  <div class="flex justify-between flex-wrap gap-x-1">
    <div v-for="product in formattedProducts" :key="product.id" class="item">
      <div :class="{'bg-gray-200': !product.logo}" class="icon">
        <img v-if="product.logo" :src="product.logo" />
      </div>
      <strong class="title">{{ product.name }}</strong>
      <QuantityInput v-model="quantities[product.id]" @change="onProductQtyChange" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QuantityInput from '@/components/order-form/fields/products/QuantityInput'

export default {
  components: {
    QuantityInput
  },
  data () {
    return {
      quantities: {}
    }
  },
  computed: {
    ...mapGetters({
      products: 'entities/products/products'
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
    onProductQtyChange () {
      this.$emit('input', this.quantities)
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
