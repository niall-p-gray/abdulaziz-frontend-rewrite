<template>
  <div v-if="!loading" class="create-order">
    <h1 class="create-order__title">
      Create Order
    </h1>
    <div class="create-order__content">
      <h2 class="create-order__content__question">
        <mark>Who Is This Order For?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <label
          for="clientName"
          class="create-order__content__form-group__label"
        >
          Client Name
        </label>
        <select
          id="clientName"
          v-model="form.clientName"
          type="text"
          class="create-order__content__form-group__input"
        >
          <option disabled selected>
            Client Name
          </option>
          <option
            v-for="client in sortClients(clients)"
            :key="client['Rec ID']"
            :value="client"
          >
            {{ client.Name }}
          </option>
        </select>
        <span class="create-order__content__form-group__message">
          Can't find the client? <router-link to="">Add Client</router-link>
        </span>
      </div>
      <div class="create-order__content__form-group">
        <label
          for="clientDetails"
          class="create-order__content__form-group__label"
        >
          Client Details
        </label>
        <input
          v-model="form.clientDetails"
          name="clientDetails"
          type="text"
          placeholder="Client Details"
          class="create-order__content__form-group__input"
        >
        <span class="create-order__content__form-group__message">
          For example if the main client is an intermediary (samples, ezCater,
          etc) - Please use this field to enter the actual client.
        </span>
      </div>
      <h2 class="create-order__content__question">
        <mark>When Should It Be Ready?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="create-order__content__form-group__date-time">
          <div class="">
            <label
              for="orderDate"
              class="create-order__content__form-group__label"
            >
              Order Date
            </label>
            <input
              v-model="form.orderDate"
              name="orderDate"
              type="date"
              placeholder="Select Date"
              class="create-order__content__form-group__input"
            >
          </div>
          <div class="">
            <label
              for="orderDate"
              class="create-order__content__form-group__label"
            >
              Order Time
            </label>
            <input
              v-model="form.orderTime"
              name="orderDate"
              type="time"
              placeholder="Select Time"
              class="create-order__content__form-group__input"
            >
          </div>
        </div>
        <span class="create-order__content__form-group__message">
          This should be the date and time that the order will be ready to LEAVE
          the shop, whether it is being picked up by a client or if we are
          delivering it.
        </span>
      </div>
      <h2 class="create-order__content__question">
        <mark>How will the client get it?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="">
          <input
            id="Pickup"
            v-model="form.deliveryPickup"
            type="radio"
            value="Pickup"
            name="pickup_delivery"
            class="create-order__content__form-group__radio"
          >
          <label for="Pickup" class="create-order__content__form-group__label">
            <span class="create-order__content__form-group__label__radio-main">Pickup</span>
            <span class="create-order__content__form-group__label__radio-second">Client will pick up at 817 Fulton</span>
          </label>
        </div>
        <div class="mt-5">
          <input
            id="Delivery"
            v-model="form.deliveryPickup"
            type="radio"
            value="Delivery"
            name="pickup_delivery"
            class="create-order__content__form-group__radio"
          >
          <label
            for="Delivery"
            class="create-order__content__form-group__label"
          >
            <span class="create-order__content__form-group__label__radio-main">Delivery</span>
            <span class="create-order__content__form-group__label__radio-second">We will handle delivery
              <router-link to="">See detail</router-link>
            </span>
          </label>
        </div>
      </div>
      <div
        v-if="form.deliveryPickup == 'Delivery'"
        class="create-order__content__form-group"
      >
        <input
          v-model="form.address"
          placeholder="Address"
          type="text"
          class="create-order__content__form-group__input"
        >
        <input
          v-model="form.apt"
          placeholder="Apt, Ste, Unit, or Floor #"
          type="text"
          class="create-order__content__form-group__input mt-3"
        >
        <div class="create-order__content__form-group__grid">
          <input
            v-model="form.state"
            placeholder="State"
            type="text"
            class="create-order__content__form-group__input"
          >
          <input
            v-model="form.zip"
            placeholder="Zip Code"
            type="text"
            class="create-order__content__form-group__input"
          >
        </div>
      </div>
      <h2 class="create-order__content__question">
        <mark>How Should It Be Prepared?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="create-order__content__form-group__row">
          <div class="flex">
            <img src="~/assets/icons/thermo-black.svg" class="w-6 h-6 mr-3">
            <p class="">
              Temperature
            </p>
          </div>
          <div class="create-order__content__form-group__row__item">
            <input
              id="warm"
              v-model="form.temperature"
              type="radio"
              value="Hot"
              name="temperature"
            >
            <label
              for="warm"
              class="create-order__content__form-group__label"
            >Warm</label>
          </div>
          <div class="create-order__content__form-group__row__item">
            <input
              id="roomTemp"
              v-model="form.temperature"
              type="radio"
              value="Room Temperature"
              name="temperature"
            >
            <label
              for="roomTemp"
              class="create-order__content__form-group__label"
            >Room Temp</label>
          </div>
          <div class="create-order__content__form-group__row__item">
            <input
              id="cold"
              v-model="form.temperature"
              type="radio"
              value="Chilled"
              name="temperature"
            >
            <label
              for="cold"
              class="create-order__content__form-group__label"
            >Cold</label>
          </div>
        </div>
        <div class="create-order__content__form-group__row">
          <div class="flex">
            <img src="~/assets/icons/plus-circle.svg" class="w-6 h-6 mr-3">
            <p class="">
              Include
            </p>
          </div>
          <div class="flex flex-col gap-5">
            <div class="create-order__content__form-group__row__item">
              <input
                id="napkins"
                v-model="form.napkins"
                type="checkbox"
                value="napkins"
                name="include"
                class="create-order__content__form-group__checkbox"
              >
              <label
                for="napkins"
                class="create-order__content__form-group__label !text-base"
              >Napkins</label>
            </div>
            <div class="create-order__content__form-group__row__item">
              <input
                id="glassineBags"
                v-model="form.glassineBags"
                type="checkbox"
                value="glassineBags"
                name="include"
                class="create-order__content__form-group__checkbox"
              >
              <label
                for="glassineBags"
                class="create-order__content__form-group__label !text-base"
              >Glassine Bags</label>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <div class="create-order__content__form-group__row__item">
              <input
                id="flavorCards"
                v-model="form.flavorCards"
                type="checkbox"
                value="flavorCards"
                name="include"
                class="create-order__content__form-group__checkbox"
              >
              <label
                for="flavorCards"
                class="create-order__content__form-group__label !text-base"
              >Flavor Cards</label>
            </div>
            <div class="create-order__content__form-group__row__item">
              <input
                id="plasticware"
                v-model="form.plasticware"
                type="checkbox"
                value="plasticware"
                name="include"
                class="create-order__content__form-group__checkbox"
              >
              <label
                for="plasticware"
                class="create-order__content__form-group__label !text-base"
              >Plasticware</label>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <label class="create-order__content__form-group__label mb-2">Special Notes</label>
          <textarea
            v-model="form.specialNotes"
            class="create-order__content__form-group__input"
            placeholder="Add any special notes here. A friend of the shop, regular buyer, special occasion, etc."
            rows="5"
          />
        </div>
      </div>
      <h2 class="create-order__content__question">
        <mark>What Flavors Are In This Order?</mark>
      </h2>
      <div class="create-order__content__flavors">
        <div
          v-for="product in products"
          :key="product.id"
          class="create-order__content__flavors__item"
        >
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            {{ product.Name }}
          </p>
          <div class="create-order__content__flavors__item__count">
            <button
              class="create-order__content__flavors__item__count__btn"
              @click="removeFlavorCount(product.id)"
            >
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input
              v-model="form.flavors[product.id]"
              class="create-order__content__flavors__item__count__input"
            >
            <button
              class="create-order__content__flavors__item__count__btn"
              @click="addFlavorCount(product.id)"
            >
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img
              src="~/assets/icons/trash.svg"
              class="w-6 h-6"
              @click="clearFlavorCount(product.id)"
            >
          </button>
        </div>
      </div>
      <div class="create-order__content__total">
        <p class="">
          <b>{{ totalFlavors }}</b> KOLACHES SELECTED
        </p>
      </div>
      <div class="create-order__content__create-btn">
        <button @click="createOrderLocal">
          Create New Order
        </button>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center text-center w-full">
    <h1 class="">
      Loading...
    </h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CreateOrder',
  layout: 'dashboard',
  data () {
    return {
      form: {
        clientName: '',
        clientDetails: '',
        flavors: {}
      },
      loading: false,
      totalFlavors: 0
    }
  },
  computed: {
    ...mapGetters({
      clients: 'create-order/getClients',
      products: 'create-order/getProducts'
    })
  },
  async mounted () {
    try {
      this.loading = true
      await this.getClients()
      await this.getProducts()
      this.products.forEach((product) => {
        this.form.flavors[product.id] = 0
      })
      this.loading = false
    } catch (error) {
      this.loading = false
      console.log(error)
    }
  },
  methods: {
    ...mapActions({
      getClients: 'create-order/getClients',
      getProducts: 'create-order/getProducts',
      createOrder: 'create-order/createOrder'
    }),
    addFlavorCount (id) {
      this.form.flavors[id] = this.form.flavors[id] + 1
      this.totalFlavors = this.totalFlavors + 1
      this.$forceUpdate()
    },
    removeFlavorCount (id) {
      this.form.flavors[id] = this.form.flavors[id] - 1
      this.totalFlavors = this.totalFlavors - 1
      this.$forceUpdate()
    },
    clearFlavorCount (id) {
      this.totalFlavors = this.totalFlavors - this.form.flavors[id]
      this.form.flavors[id] = 0
      this.$forceUpdate()
    },
    async createOrderLocal () {
      const payload = {
        'Data Source': 'Client Order Page',
        Client: [this.form.clientName['Rec ID']],
        'Client Details': this.form.clientDetails,
        Date: this.form.orderDate,
        'Ready Time': this.form.orderTime,
        'Delivery Type': this.form.deliveryPickup,
        'Delivery Address': this.form.address,
        'Delivery Address JSON': JSON.stringify([{ elementId: 'address2', elementValue: '' }, { elementId: 'ship-address', elementValue: this.form.address }, { elementId: 'locality', elementValue: this.form.apt }, { elementId: 'state', elementValue: this.form.state }, { elementId: 'postcode', elementValue: this.form.zip }, { elementId: 'country', elementValue: '' }]),
        Notes: this.form.specialNotes,
        Temperature: this.form.temperature,
        Include: [
          this.form.plasticware ? 'Plasticware' : '',
          this.form.napkins ? 'Napkins' : '',
          this.form.flavorCards ? 'Flavor Cards' : '',
          this.form.glassineBags ? 'Glassine Bags' : ''
        ].filter(item => item !== ''),
        flavors: this.form.flavors
      }

      try {
        this.loading = true
        await this.createOrder(payload)
        this.form = {
          clientName: '',
          clientDetails: '',
          flavors: {}
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    sortClients (clients) {
      const localClients = JSON.parse(JSON.stringify(clients))
      return localClients.sort((a, b) => {
        if (a.Name < b.Name) {
          return -1
        }
        if (a.Name > b.Name) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<style>
</style>
