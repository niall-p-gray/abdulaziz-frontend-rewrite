<template>
  <div>
    <div class="lg:w-8/12 mx-auto">
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
        <section class="actions-wrapper">
          <h4 class="total-items"><strong>{{ totalSelectedProducts }}</strong> KOLACHES SELECTED</h4>
          <div class="flex items-center md:mt-6">
            <button v-if="orderId" @click="openDeletionModal" class="btn btn__secondary !text-gray-500 mr-4 md:mr-2">
              <span class="hidden md:inline">Delete</span>
              <font-awesome-icon :icon="['fas', 'trash']" class="text-base block md:hidden" />
            </button>
            <button v-if="orderId" @click="openCopyOrderModal" class="btn btn__secondary mr-4 md:mr-2">
              <span class="hidden md:inline">Copy</span>
              <font-awesome-icon :icon="['fas', 'copy']" class="text-base block md:hidden text-gray-500" />
            </button>
            <button
            @click="submit"
            :class="{'btn__disabled': submitting}"
            :disabled="submitting"
            class="btn">
              <span v-if="orderId">{{ submitting ? 'Updating...' : 'Update' }}</span>
              <span v-else>{{ submitting ? 'Submitting...' : 'Create' }}</span>
            </button>
          </div>
        </section>
      </div>
      <div v-else class="mt-8">
        <p class="flex justify-center items-center">
          <span>Order successfully created</span>
          <span class="ml-2 cursor-pointer">
            <font-awesome-icon :icon="['fas', 'eye']" class="text-xs"/>
            <span>View</span>
          </span>
        </p>
        <div class="text-center mt-8">
          <nuxt-link :to="`/orders/upcoming`" class="btn">
            View all upcoming orders
          </nuxt-link>
        </div>
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
import CopyOrderModal from '@/components/order-form/modas/CopyOrderModal'
import DeleteOrderModal from '@/components/order-form/modas/DeleteOrderModal'

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
      fields: 'order-form/fields',
      orderCreationPayload: 'order-form/orderCreationPayload'
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
      this.createdOrderId = await this.createOrder(this.orderCreationPayload)

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
    },
    openCopyOrderModal () {
      this.$modal.show(CopyOrderModal, {}, {
        width: 400,
        name: 'copy-order'
      })
    },
    openDeletionModal () {
      const props = {
        orderId: this.orderId
      }

      this.$modal.show(DeleteOrderModal, props, {
        width: 400,
        name: 'delete-order'
      })
    }
  }
}
</script>

<style scoped>
section {
  @apply mt-10;
}

.actions-wrapper {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  @apply px-3 py-3;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  z-index: 5;
  background: #fff;
}

.actions-wrapper .total-items {
  @apply text-sm;
}

.btn__secondary {
  border: none;
  padding: 0;
}

@media (min-width: 768px) {
  .actions-wrapper {
    flex-direction: column;
    position: relative;
    box-shadow: none;
    padding: 0;
  }

  .total-items {
    @apply text-base;
  }

  .btn__secondary {
    @apply border border-gray-300 px-3 py-2;
  }
}
</style>
