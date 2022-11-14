<template>
    <div class="mt-4">
        <div>
            <label class="option">
                <input v-model="deliveryMethod" @change="onChange" value="Pickup" type="radio" />
                <span class="text">Pick up - Client will pick it up a 817 Fulton</span>
            </label>
            <label class="option mt-2">
                <input v-model="deliveryMethod" @change="onChange" value="Delivery" type="radio" />
                <span class="text">Delivery - We will handle delivery (see details</span>
            </label>
        </div>
        <div v-if="deliveryMethod === 'Delivery'" class="address">
            <input v-model="address.shipAddress" @change="onChange" type="text" placeholder="Address">
            <input v-model="address.locality" @change="onChange" type="text" placeholder="Apartment, unit, suite, or floor #">
            <div class="flex items-center">
                <input v-model="address.state" @change="onChange" type="text" placeholder="State/Province" class="w-1/2">
                <input v-model="address.postcode" @change="onChange" type="text" placeholder="Postal code" class="w-1/2 ml-2">
            </div>
            <div class="form-group">
              <label>Delivery Notes</label>
              <textarea v-model="deliveryNotes" cols="30" @change="onChange" placeholder="Delivery Notes"></textarea>
            </div>
            <div class="form-group">
              <label>Delivery Driver</label>
              <input v-model="deliveryDriver" @change="onChange" type="text" placeholder="Delivery Driver">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    selectedClient: {
      required: true
    }
  },
  data () {
    return {
      client: this.selectedClient,
      deliveryMethod: 'Pickup',
      deliveryNotes: null,
      deliveryDriver: null,
      address: {
        shipAddress: this.client ? this.client.address : null,
        address2: null,
        locality: null,
        state: null,
        postcode: null,
        country: 'United States'
      }
    }
  },
  computed: {
    json () {
      return JSON.stringify([
        { elementId: 'address2', elementValue: '' },
        { elementId: 'ship-address', elementValue: this.address.shipAddress },
        { elementId: 'locality', elementValue: this.address.locality },
        { elementId: 'state', elementValue: this.address.state },
        { elementId: 'postcode', elementValue: this.address.postcode },
        { elementId: 'country', elementValue: this.address.country }
      ])
    }
  },
  methods: {
    onChange () {
      this.$emit('input', {
        address: this.address,
        deliveryMethod: this.deliveryMethod,
        json: this.json,
        deliveryNotes: this.deliveryNotes,
        deliveryDriver: this.deliveryDriver
      })
    }
  },
  watch: {
    selectedClient: {
      handler: function (newValue) {
        if (newValue && newValue.address) {
          this.address.shipAddress = newValue.address
        }
        this.onChange()
      }
    }
  }
}
</script>

<style scoped>
.option{
  @apply flex text-sm;
}

.option .text{
  @apply text-sm align-middle ml-2;
}

.address{
    @apply mt-2;
}

.address input{
    @apply mt-3 py-2 px-4;
}
</style>
