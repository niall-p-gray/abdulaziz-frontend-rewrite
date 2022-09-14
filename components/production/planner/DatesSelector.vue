<template>
  <ul class="flex w-full py-4 overflow-x-scroll">
    <li
      @click="toggle(date.date)"
      v-for="(date, index) in dateRange"
      :key="index"
      :class="{ '!bg-yellow-300 font-bold': isDateSelected(date.date), '!cursor-not-allowed': !selectable }"
      class="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-yellow-100 cursor-pointer"
    >
      {{ date.displayValue }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    backwardDays: {
      type: Number,
      required: true
    },
    forwardDays: {
      type: Number,
      required: true
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedDates: this.value
    }
  },
  computed: {
    dateRange () {
      const startDate = this.$moment().subtract(this.backwardDays, 'days')
      const endDate = this.$moment().add(this.forwardDays, 'days')

      const datesInBetween = []

      for (let date = this.$moment(startDate); date.diff(endDate, 'days') <= 0; date.add(1, 'days')) {
        datesInBetween.push({
          displayValue: date.format('ddd, M/D'),
          date: date.format('YYYY-MM-DD')
        })
      }

      return datesInBetween
    }
  },
  methods: {
    toggle (date) {
      if (!this.selectable) {
        return
      }

      const alreadySelected = this.selectedDates.includes(date)

      if (alreadySelected) {
        this.selectedDates = this.selectedDates.filter(d => d !== date)
      } else {
        this.selectedDates.push(date)
      }

      this.$emit('input', this.selectedDates)
      this.$emit('change')
    },
    isDateSelected (date) {
      return this.selectedDates.includes(date)
    }
  },
  watch: {
    value: {
      handler: function (newValue) {
        this.selectedDates = newValue
      }
    }
  }
}
</script>

<style scoped>
li {
  margin: 0 5px;
  min-width: 95px;
}
</style>
