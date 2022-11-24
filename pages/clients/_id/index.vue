<template>
  <div>
    <portal v-if="client" to="page-title">
      <ClientName :client="client" />
    </portal>
    <div v-if="!loading && !error" class="mt-10 mx-auto">
      <h1 class="text-xl font-bold">Orders ({{ clientOrders.length }})</h1>
      <div class="mt-10">
        <OrderDetailsCard v-for="order in clientOrders" :key="order.id" :order="order" />
      </div>
    </div>
    <div v-else class="mt-16 flex justify-center">
      <span v-if="loading">Loading...</span>
      <span v-else class="text-red-500">
        An error occured, please try refreshing
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientName from '@/components/clients/ClientName'
import OrderDetailsCard from '@/components/orders/order-details-card/OrderDetailsCard'
import { AIRTABLE_ENTITITY_FIELDS } from '@/utils'
import airQuery from '@/utils/airtable-query-builder'
import authGuardMixin from '@/mixins/auth-guard'

export default {
  components: {
    ClientName,
    OrderDetailsCard
  },
  layout: 'dashboard',
  mixins: [authGuardMixin],
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
      await this.getClients({
        filterByFormula: airQuery()
          .whereId(this.$route.params.id)
          .get()
      })

      // client does not exist
      if (!this.client) {
        this.$nuxt.error({ statusCode: 404, message: 'Not found' })
        return
      }

      await this.getProducts({
        filterByFormula: airQuery().get(),
        fields: AIRTABLE_ENTITITY_FIELDS.PRODUCTS
      })

      await this.getOrders({
        filterByFormula: airQuery().where('Client Rec ID', this.client.id).get(),
        sort: [{ field: 'Date', direction: 'desc' }],
        fields: AIRTABLE_ENTITITY_FIELDS.ORDER
      })

      if (this.orders.length) {
        await this.getOrderItems({
          filterByFormula: airQuery().whereIn('Order Rec ID', this.orders.map(o => o.id)).get()
        })
      }
    } catch (error) {
      console.error(error)
      this.error = true
    }

    this.loading = false
  },
  computed: {
    ...mapGetters({
      clients: 'entities/clients/clients',
      orders: 'entities/orders/orders'
    }),
    client () {
      return this.clients.find(client => client.id === this.$route.params.id)
    },
    clientOrders () {
      return this.orders.map((order) => {
        const date = this.$moment(order.fields.Date, 'YYYY-MM-DD').format('MM/DD/YYYY')
        let readyTime = order.fields['Ready Time']
        let deliveryTime = order.fields['Delivery Time']

        if (readyTime) readyTime = this.$moment(readyTime, 'hh:mm').format('h:mm a')
        if (deliveryTime) deliveryTime = this.$moment(deliveryTime, 'hh:mm').format('h:mm a')

        return {
          id: order.id,
          date,
          readyTime,
          deliveryTime,
          qty: order.fields['Summed Orders'],
          notes: order.fields.Notes,
          deliveryNotes: order.fields['Delivery Notes'],
          deliveryDriver: order.fields['Delivery Driver'],
          deliveryType: order.fields['Delivery Type'],
          clientDetails: order.fields['Client Details'],
          address: order.fields['Delivery Address'] || this.client.fields.Address,
          phoneNumber: order.fields['Order Phone'] || this.client.fields.Phone,
          clientName: this.client.fields.Name,
          contactName: order.fields['Order Contact'] || this.client.fields['Primary Contact']
        }
      })
    }
  },
  methods: {
    ...mapActions({
      getClients: 'entities/clients/get',
      getProducts: 'entities/products/get',
      getOrders: 'entities/orders/get',
      getOrderItems: 'entities/order-items/get'
    })
  }
}
</script>
