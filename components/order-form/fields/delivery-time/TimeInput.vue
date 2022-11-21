<template>
  <input
    v-model="time"
    @change="onChange"
    type="text"
    :class="{ '!border !border-red-500': !valid }"
    placeholder="9:45 am"
  />
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      time: ''
    }
  },
  computed: {
    valid () {
      if (!this.time || this.time === '') return true

      return /^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$/.test(
        this.time.trim().toLowerCase()
      )
    },
    timeIn24Format () {
      return this.$moment(this.time.trim(), 'h:mm a').format('HH:mm')
    }
  },
  methods: {
    onChange () {
      this.time = this.time.trim().toLowerCase()

      if (this.valid) {
        this.$emit('input', this.timeIn24Format)
        this.$emit('change')
      }
    },
    setValue (value) {
      if (typeof value === 'string' && this.$moment(value.trim(), 'HH:mm').isValid()) {
        this.time = this.$moment(value.trim(), 'HH:mm').format('h:mm a')
      } else {
        this.time = value
      }
    }
  },
  mounted () {
    this.setValue(this.value)
  },
  watch: {
    value: {
      handler: function(newVal) {
        this.setValue(newVal)
      }
    }
  }
}
</script>
