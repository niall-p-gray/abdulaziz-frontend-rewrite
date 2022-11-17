<template>
  <div class="p-3">
    <h3 class="font-bold">Delete</h3>
    <div>
        <p class="mt-6">Do you really want to delete this order?</p>
        <div class="flex justify-end mt-3">
          <button :disabled="deleting" @click="confirm" :class="{'btn__disabled': deleting}" class="btn !bg-red-500 !text-white">
            {{ deleting ? 'deleting' : 'Delete' }}
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteOrderModal',
  props: {
    orderId: {
      required: true
    }
  },
  data () {
    return {
      deleting: false
    }
  },
  methods: {
    ...mapActions({
      deleteOrder: 'order-form/delete'
    }),
    async confirm () {
      this.deleting = true

      const deleted = await this.deleteOrder(this.orderId)

      this.deleting = false

      if (deleted) {
        this.$notify({
          text: 'Order deleted successfully',
          type: 'success'
        })

        this.$router.push('/orders/upcoming')
      } else {
        this.$notify({
          text: 'Could not delete order, please try again later',
          type: 'error'
        })
      }

      this.$modal.hide('delete-order')
    }
  }
}
</script>
