<template>
  <div>
    <div class="w-8/12 mx-auto">
      <div v-if="!created">
        <section>
          <h4 class="section-title">Who Is This Order For?</h4>
          <ClientSelector v-model="form.client" class="mt-6" />
        </section>
        <section>
          <h4 class="section-title">When Should It Be Ready?</h4>
          <div class="mt-6">
            <DeliveryDateTimes v-model="form.deliveryDate" />
          </div>
        </section>
        <section>
          <h4 class="section-title">How Will the Client Get It?</h4>
          <div class="mt-6">
            <Delivery v-model="form.delivery" :selected-client="form.client" />
          </div>
        </section>
        <section>
          <SpecialNotes v-model="form.specialNotes" />
        </section>
        <section>
          <h4 class="section-title">What Flavors Are In This Order?</h4>
          <Products v-model="form.quantities" class="mt-6" />
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
import { mapActions } from 'vuex'
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
      form: {
        client: null,
        deliveryDate: null,
        delivery: null,
        quantities: {},
        specialNotes: null
      },
      submitting: false,
      created: false
    }
  },
  computed: {
    totalSelectedProducts () {
      let total = 0
      for (const prodId in this.form.quantities) {
        total += this.form.quantities[prodId]
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
        Client: [this.form.client.id],
        Date: this.form.deliveryDate.date,
        'Delivery Type': this.form.delivery.deliveryMethod
      }

      if (this.form.delivery.deliveryMethod.toLowerCase() === 'delivery') {
        payload['Delivery Address'] = this.form.delivery.address.shipAddress
        payload['Delivery Address JSON'] = this.form.delivery.json
      }

      if (this.form.delivery.deliveryNotes) payload['Delivery Notes'] = this.form.delivery.deliveryNotes

      if (this.form.deliveryDate.readyTime) payload['Ready Time'] = this.form.deliveryDate.readyTime

      if (this.form.deliveryDate.deliveryTime) payload['Delivery Time'] = this.form.deliveryDate.deliveryTime

      if (this.form.client.details) payload['Client Details'] = this.form.client.details

      if (this.form.specialNotes) payload.Notes = this.form.specialNotes

      if (this.form.client.phoneNumber) payload['Order Phone'] = this.form.client.phoneNumber

      if (this.form.client.contactName) payload['Order Contact'] = this.form.client.contactName

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
      for (const prodId in this.form.quantities) {
        const qty = this.form.quantities[prodId]
        const newOrderItem = {
          Product: [prodId],
          Order: [orderId],
          Orders: qty
        }
        await this.createOrderItem(newOrderItem)
      }
    },
    validate () {
      if (!this.form.client) {
        this.$notify({
          text: 'Please select a client',
          type: 'error'
        })
        return false
      }

      if (!this.form.deliveryDate || !this.form.deliveryDate.date) {
        this.$notify({
          text: 'Please pick a date',
          type: 'error'
        })
        return false
      }

      if (this.form.delivery.deliveryMethod.toLowerCase() === 'delivery') {
        const { shipAddress, locality, state, postcode } = this.form.delivery.address
        const missingField = !shipAddress || !locality || !state || !postcode
        if (missingField) {
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
