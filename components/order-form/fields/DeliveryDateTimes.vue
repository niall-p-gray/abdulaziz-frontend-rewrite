<template>
  <div>
    <div class="date-inputs-wrapper items-center justify-between">
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
  mounted () {
    if (this.fields.deliveryDate) {
      this.values.date = this.fields.deliveryDate.date
      this.values.readyTime = this.fields.deliveryDate.readyTime
      this.values.deliveryTime = this.fields.deliveryDate.deliveryTime
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

@media (min-width: 615px) {
  .date-inputs-wrapper {
    display: flex;
  }
}

</style>
