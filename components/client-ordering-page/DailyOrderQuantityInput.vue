<template>
  <div class="flex justify-center items-center">
    <font-awesome-icon
      @click="decrement"
      v-if="showButtons && editable"
      :icon="['fas', 'minus']"
      class="text-lg mr-2 cursor-pointer"
    />
    <input
    type="text"
    v-model="value"
    :class="{'!bg-red-100': !editable, 'invisible': !shouldBeVisible}"
    :disabled="!editable"
    @change="onChange"
    @keypress="onInput" >
    <font-awesome-icon
      @click="increment"
      v-if="showButtons && editable"
      :icon="['fas', 'plus']"
      class="text-lg ml-2 cursor-pointer"
    />
    <img
    v-if="showButtons && editable"
    @click="clear"
    class="ml-6"
    src="~/assets/icons/trash.svg" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { ddmmyyDateValidator } from '@/utils/prop-validators'

export default {
  props: {
    showButtons: {
      default: false,
      type: Boolean
    },
    product: {
      type: Object,
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
  computed: {
    ...mapGetters({
      currentClient: 'weekly-client-orders/currentClient'
    }),
    shouldBeVisible () {
      const dayName = this.$moment(this.day, 'DD-MM-YYYY').format('dddd')
      const deliveryDays = this.currentClient.fields['Delivery Days'] || []
      // Unless it's an admin editing, hide if the day is outside this client's delivery days
      return this.inAdminMode || deliveryDays.some(d => d.toLowerCase() === dayName.toLowerCase())
    },
    editable () {
      // Products can only be ordered X hours before the desired delivery day
      const deadline = this.$moment(this.day, 'DD-MM-YYYY').subtract(this.product.loadTimeInHrs, 'hours')
      return this.inAdminMode || this.$moment().isBefore(deadline)
    },
    inAdminMode () {
      return this.$route.query.admin === 'true' || this.$route.query.admin === '1'
    }
  },
  methods: {
    ...mapMutations({
      stageProductQtyUpdate: 'weekly-client-orders/UPDATE_STAGED_PRODUCT_QTY_UPDATES'
    }),
    onInput (e) {
      // Accept digits only
      if (!(e.charCode >= 48 && e.charCode <= 57)) {
        e.preventDefault()
      }
    },
    onChange () {
      // Reset if the value is empty, negative or has a leading zero
      if (/^0/.test(this.value) || /^-[0-9]*/.test(this.value) || this.value === '') {
        this.value = 0
      }

      const productOrderToUpdate = {
        productId: this.product.id,
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
