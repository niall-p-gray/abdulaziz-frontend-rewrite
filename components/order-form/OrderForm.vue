<template>
  <div>
    <div class="w-8/12 mx-auto">
      <div v-if="!createdOrderId">
        <section>
          <h4 class="section-title">Who Is This Order For?</h4>
          <ClientSelector class="mt-6" />
        </section>
        <section>
          <h4 class="section-title">When Should It Be Ready?</h4>
          <div class="mt-6">
            <DeliveryDateTimes />
          </div>
        </section>
        <section>
          <h4 class="section-title">How Will the Client Get It?</h4>
          <div class="mt-6">
            <Delivery />
          </div>
        </section>
        <section>
          <SpecialNotes />
        </section>
        <section>
          <h4 class="section-title">What Flavors Are In This Order?</h4>
          <Products class="mt-6" />
        </section>
        <section class="flex flex-col items-center">
          <h4><strong>{{ totalSelectedProducts }}</strong> KOLACHES SELECTED</h4>
          <button
          @click="submit"
          :class="{'btn__disabled': submitting}"
          :disabled="submitting"
          class="btn mt-6">
            <span v-if="orderId">{{ submitting ? 'Updating...' : 'Update Order' }}</span>
            <span v-else>{{ submitting ? 'Submitting...' : 'Create Order' }}</span>
          </button>
        </section>
      </div>
      <div v-else class="mt-8">
        <p class="text-center">
          <span>Order successfully created</span>
          <nuxt-link :to="`/orders/${createdOrderId}?source=create-form`" class="mls-4 btn">
          View/Edit
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientSelector from '@/components/order-form/fields/ClientSelector'
import DeliveryDateTimes from '@/components/order-form/fields/DeliveryDateTimes'
import Delivery from '@/components/order-form/fields/Delivery'
import SpecialNotes from '@/components/order-form/fields/SpecialNotes'
import Products from '@/components/order-form/fields/products/Products'

export default {
  components: {
    ClientSelector,
    DeliveryDateTimes,
    Delivery,
    SpecialNotes,
    Products
  },
  props: {
    orderId: {
      default: null
    }
  },
  data () {
    return {
      submitting: false,
      createdOrderId: null
    }
  },
  computed: {
    ...mapGetters({
      fields: 'order-form/fields'
    }),
    totalSelectedProducts () {
      let total = 0
      for (const prodId in this.fields.quantities) {
        total += this.fields.quantities[prodId]
      }

      return total
    }
  },
  methods: {
    ...mapActions({
      createOrder: 'order-form/create',
      updateOrder: 'order-form/update'
    }),
    async submit () {
      if (!this.validate()) return

      this.submitting = true

      if (this.orderId) {
        await this.update()
      } else {
        await this.create()
      }

      this.submitting = false
    },
    async create () {
      this.createdOrderId = await this.createOrder()

      if (this.createdOrderId) {
        this.$notify({
          text: 'Order created',
          type: 'success'
        })
      } else {
        this.$notify({
          text: 'Could not create order, please try again later',
          type: 'error'
        })
      }
    },
    async update () {
      const success = await this.updateOrder(this.orderId)

      if (success) {
        this.$notify({
          text: 'Order updated',
          type: 'success'
        })
      } else {
        this.$notify({
          text: 'Could not save changes',
          type: 'error'
        })
      }
    },
    validate () {
      if (!this.fields.client || !this.fields.client.id) {
        this.$notify({
          text: 'Please select a client',
          type: 'error'
        })
        return false
      }

      if (!this.fields.deliveryDate || !this.fields.deliveryDate.date) {
        this.$notify({
          text: 'Please pick a date',
          type: 'error'
        })
        return false
      }

      if (this.fields.delivery.deliveryMethod.toLowerCase() === 'delivery') {
        const { shipAddress } = this.fields.delivery.address
        if (!shipAddress || shipAddress.trim() === '') {
          this.$notify({
            text: 'Please enter an address',
            type: 'error'
          })
          return false
        }
      }

      if (!this.totalSelectedProducts && !this.orderId) {
        this.$notify({
          text: 'No flavors selected',
          type: 'error'
        })
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>
section {
  @apply mt-10;
}
</style>
