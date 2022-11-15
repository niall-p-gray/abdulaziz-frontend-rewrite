<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="form-group">
        <label>Date</label>
        <input
          v-model="values.date"
          @change="onChange"
          type="date"
          placeholder="Select Date"
        />
      </div>
      <div class="form-group">
        <label>Ready Time</label>
        <input
          v-model="values.readyTime"
          @change="onChange"
          type="time"
          placeholder="Select Time"
        />
      </div>
      <div class="form-group">
        <label>Delivery Time</label>
        <input
          v-model="values.deliveryTime"
          @change="onChange"
          type="time"
          placeholder="Select Time"
        />
      </div>
    </div>
    <p class="note">
      This should be the date and time that the order will be ready to LEAVE the
      shop, whether it is being picked up by a client or we are delivering it.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      values: {
        date: null,
        readyTime: null,
        deliveryTime: null
      }
    }
  },
  computed: {
    ...mapGetters({
      fields: 'order-form/fields'
    })
  },
  methods: {
    ...mapActions({
      updateFields: 'order-form/updateFields'
    }),
    onChange () {
      this.updateFields({
        deliveryDate: {
          ...this.values
        }
      })
    }
  },
  watch: {
    fields: {
      handler: function () {}
    }
  }
}
</script>

<style scoped>
input {
  width: auto;
}
</style>
