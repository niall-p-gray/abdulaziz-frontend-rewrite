<template>
  <div class="mb-8">
    <portal to="page-title">Edit Order</portal>
    <div v-if="!loading && !error" class="mt-16">
        <OrderForm :order-id="$route.params.id"/>
    </div>
    <div v-else class="mt-16 flex justify-center">
      <span v-if="loading">Loading...</span>
      <span v-else class="text-red-500">An error occured, please try refreshing</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import airQuery from '@/utils/airtable-query-builder'
import OrderForm from '@/components/order-form/OrderForm'

export default {
  components: {
    OrderForm
  },
  layout: 'dashboard',
  data () {
    return {
      loading: true,
      error: false
    }
  },
  async mounted () {
    this.loading = true
    this.error = false

    try {
      await this.getOrders({ filterByFormula: airQuery().whereId(this.$route.params.id).get() })

      if (!this.order) {
        this.$nuxt.error({ statusCode: 404, message: 'Not found' })
        return
      }

      await this.getOrderItems({
        filterByFormula: airQuery().where('Order Rec ID', this.order.id).get()
      })

      await this.getClients()

      await this.getProducts({
        filterByFormula: airQuery()
          .where('Available', 1)
          .notEmpty('Name')
          .notEmpty('Available Days')
          .get()
      })

      this.populateClientFormFields()
      this.populateDateFormFields()
      this.populateDeliveryFormFields()
      this.populateSpecialNotesFormField()
      this.populateProductQtyFormFields()
    } catch (error) {
      console.error(error)
      this.error = true
    }

    this.loading = false
  },
  methods: {
    ...mapActions({
      getOrders: 'entities/orders/get',
      getOrderItems: 'entities/order-items/get',
      getClients: 'entities/clients/get',
      getProducts: 'entities/products/get',
      updateFields: 'order-form/updateFields'
    }),
    populateClientFormFields () {
      this.updateFields({
        client: {
          id: this.client.id,
          details: this.order.fields['Client Details'],
          contactName: this.order.fields['Order Contact'],
          phoneNumber: this.order.fields['Order Phone'],
          address: this.client.fields.Address
        }
      })
    },
    populateDateFormFields () {
      this.updateFields({
        deliveryDate: {
          date: this.order.fields.Date,
          readyTime: this.order.fields['Ready Time'],
          deliveryTime: this.order.fields['Delivery Time']
        }
      })
    },
    populateDeliveryFormFields () {
      const field = {
        deliveryMethod: this.order.fields['Delivery Type'],
        deliveryNotes: this.order.fields['Delivery Notes'],
        deliveryDriver: this.order.fields['Delivery Driver'],
        json: this.order.fields['Delivery Address JSON']
      }

      if (field.json) {
        const json = JSON.parse(field.json)

        field.address = {}
        json.forEach((element) => {
          if (element.elementId === 'address2') return

          let key = element.elementId
          if (key === 'ship-address') key = 'shipAddress'

          field.address[key] = element.elementValue
        })
      }

      this.updateFields({ delivery: field })
    },
    populateSpecialNotesFormField () {
      this.updateFields({ specialNotes: this.order.fields.Notes })
    },
    populateProductQtyFormFields () {
      const quantities = {}
      this.orderItems.forEach((orderItem) => {
        if (orderItem.fields['Order Rec ID'] !== this.order.id) return
        const id = orderItem.fields.Product[0]

        if (!quantities[id]) {
          quantities[id] = 0
        }

        quantities[id] += orderItem.fields.Orders
      })
      this.updateFields({ quantities })
    }
  },
  computed: {
    ...mapGetters({
      orders: 'entities/orders/orders',
      orderItems: 'entities/order-items/orderItems',
      clients: 'entities/clients/clients'
    }),
    order () {
      return this.orders.find(o => o.id === this.$route.params.id)
    },
    client () {
      return this.clients.find(cl => cl.id === this.order.fields.Client[0])
    }
  }
}
</script>
