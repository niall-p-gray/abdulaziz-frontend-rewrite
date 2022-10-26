<template>
  <div class="flex justify-center items-center">
    <font-awesome-icon
      @click="decrement"
      v-if="showButtons"
      :icon="['fas', 'minus']"
      class="text-lg mr-2 cursor-pointer"
    />
    <input type="text" v-model="value" @change="onChange" />
    <font-awesome-icon
      @click="increment"
      v-if="showButtons"
      :icon="['fas', 'plus']"
      class="text-lg ml-2 cursor-pointer"
    />
    <img
    v-if="showButtons"
    @click="clear"
    class="ml-6"
    src="~/assets/icons/trash.svg" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  props: {
    showButtons: {
      default: false,
      type: Boolean
    },
    productId: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    day: {
      validator: ddmmyyDateValidator,
      required: true
    }
  },
  data () {
    return {
      value: this.qty
    }
  },
  methods: {
    ...mapMutations({
      stageProductQtyUpdate: 'weekly-client-orders/UPDATE_STAGED_PRODUCT_QTY_UPDATES'
    }),
    onChange () {
      const productOrderToUpdate = {
        productId: this.productId,
        oldQty: this.qty,
        newQty: parseInt(this.value),
        day: this.day
      }
      this.stageProductQtyUpdate(productOrderToUpdate)
    },
    increment () {
      this.value++
      this.onChange()
    },
    decrement () {
      if (this.value > 0) {
        this.value--
        this.onChange()
      }
    },
    clear () {
      this.value = 0
      this.onChange()
    }
  },
  watch: {
    qty: {
      handler: function (newValue) {
        this.value = newValue
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 35px;
  padding: 5px;
  text-align: center;
}

input:focus {
  @apply bg-gray-100;
}

@media (min-width: 600px) {
  input {
    width: 46px;
  }
}
</style>
