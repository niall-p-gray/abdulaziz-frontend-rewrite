<template>
  <div>
    <div class="w-8/12 mx-auto">
      <div v-if="!created">
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
            {{ submitting ? 'Submitting...' : 'Create Order' }}
          </button>
        </section>
      </div>
      <div v-else class="mt-8">
        <p class="text-center">Order successfully created</p>
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
  data () {
    return {
      submitting: false,
      created: false
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
      createOrder: 'entities/orders/create',
      createOrderItem: 'entities/order-items/create'
    }),
    submit () {
      if (!this.validate()) return
      this.createMainOrder()
    },
    async createMainOrder () {
      const payload = {
        'Data Source': 'Admin Order Creation Page',
        Client: [this.fields.client.id],
        Date: this.fields.deliveryDate.date,
        'Delivery Type': this.fields.delivery.deliveryMethod
      }

      if (this.fields.delivery.deliveryMethod.toLowerCase() === 'delivery') {
        payload['Delivery Address'] = this.fields.delivery.address.shipAddress
        payload['Delivery Address JSON'] = this.fields.delivery.json
      }

      if (this.fields.delivery.deliveryNotes) payload['Delivery Notes'] = this.fields.delivery.deliveryNotes

      if (this.fields.delivery.deliveryDriver) payload['Delivery Driver'] = this.fields.delivery.deliveryDriver

      if (this.fields.deliveryDate.readyTime) payload['Ready Time'] = this.fields.deliveryDate.readyTime

      if (this.fields.deliveryDate.deliveryTime) payload['Delivery Time'] = this.fields.deliveryDate.deliveryTime

      if (this.fields.client.details) payload['Client Details'] = this.fields.client.details

      if (this.fields.specialNotes) payload.Notes = this.fields.specialNotes

      if (this.fields.client.phoneNumber) payload['Order Phone'] = this.fields.client.phoneNumber

      if (this.fields.client.contactName) payload['Order Contact'] = this.fields.client.contactName

      this.submitting = true

      try {
        const order = await this.createOrder(payload)
        await this.createOrderLines(order.id)
        this.created = true

        this.$notify({
          text: 'Order created',
          type: 'success'
        })
      } catch (error) {
        console.error(error)
        this.$notify({
          text: 'Could not create order, please try again later',
          type: 'error'
        })
      }

      this.submitting = false
    },
    async createOrderLines (orderId) {
      for (const prodId in this.fields.quantities) {
        const qty = this.fields.quantities[prodId]
        const newOrderItem = {
          Product: [prodId],
          Order: [orderId],
          Orders: qty
        }
        await this.createOrderItem(newOrderItem)
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

      if (!this.totalSelectedProducts) {
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
