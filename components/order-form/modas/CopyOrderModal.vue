<template>
  <div class="p-3">
    <h3 class="font-bold">Copy this order to another date</h3>
    <div v-if="createdOrderId" class="my-6 text-center">
        <a :href="`/orders/${createdOrderId}`" target="_blank" class="btn">
          View
        </a>
    </div>
    <div v-else>
        <div class="form-group mt-6">
        <label>Date</label>
        <input
            v-model="date"
            type="date"
            placeholder="Select Date"
        />
        </div>
        <div class="flex justify-end mt-3">
        <button :disabled="copying" @click="copy" :class="{'btn__disabled': copying}" class="btn">
          {{ copying ? 'Copying' : 'Copy' }}
        </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CopyOrderModal',
  data () {
    return {
      date: null,
      createdOrderId: null,
      copying: false
    }
  },
  computed: {
    ...mapGetters({
      orderCreationPayload: 'order-form/orderCreationPayload'
    })
  },
  methods: {
    ...mapActions({
      create: 'order-form/create'
    }),
    async copy () {
      if (!this.date) {
        this.$notify({ text: 'Please select a date', type: 'error' })
        return
      }

      if (this.date === this.orderCreationPayload.Date) {
        this.$notify({
          text: 'Duplicate:  Please select a different date',
          type: 'error'
        })
        return
      }

      const payload = {
        ...this.orderCreationPayload,
        Date: this.date
      }

      this.copying = true
      this.createdOrderId = await this.create(payload)
      this.copying = false

      if (this.createdOrderId) {
        this.$notify({
          text: 'Order copied successfully',
          type: 'success'
        })
      } else {
        this.$notify({
          text: 'Could not copy order, please try again later',
          type: 'error'
        })
      }
    }
  }
}
</script>
