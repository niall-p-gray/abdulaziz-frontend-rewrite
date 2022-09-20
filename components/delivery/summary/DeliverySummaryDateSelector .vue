<template>
  <div class="date-picker-wrapper">
    <client-only>
      <div class="calendar">
        <datePicker
          ref="datepicker"
          :value="selectedDate"
          :calendar-button="true"
          @selected="setDate">
            <template #calendarBtn>
              <button>
                <img class="w-4 h-4" src="~/assets/icons/calendar.svg" >
                <span>{{ selectedMonth }}</span>
              </button>
            </template>
        </datePicker>
        <button>
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-xs" />
          <span>Back to Today</span>
        </button>
      </div>
      <DeliverySummaryDaySelector :date="selectedDate" @select="setDay"/>
    </client-only>
  </div>
</template>

<script>
import DatePicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'
import DeliverySummaryDaySelector from '@/components/delivery/summary/DeliverySummaryDaySelector'

export default {
  components: {
    DatePicker,
    DeliverySummaryDaySelector
  },
  props: {
    initialDate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      openDatePicker: false,
      selectedDate: this.$moment().format('YYYY/MM/DD')
    }
  },
  computed: {
    selectedMonth () {
      return this.$moment(this.selectedDate).format('MMMM')
    }
  },
  methods: {
    toggle () {
      if (this.openDatePicker) {
        this.$refs.datepicker.close()
      } else {
        this.$refs.datepicker.showCalendar()
      }

      this.openDatePicker = !this.openDatePicker
    },
    setDate (date) {
      // Had to do it this way, because for some reason date returned from the date picker was off by 1 day
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      const mom = this.$moment.utc(d)
      this.selectedDate = mom.format('YYYY/MM/DD')

      this.$emit('change', mom.format('YYYY-MM-DD'))
    },
    setDay (monthDayNum) {
      const currentDate = this.$moment(this.selectedDate, 'YYYY/MM/DD')
      currentDate.set('date', monthDayNum)

      this.selectedDate = currentDate.format('YYYY/MM/DD')

      this.$emit('change', currentDate.format('YYYY-MM-DD'))
    }
  }
}
</script>

<style scoped>
.date-picker-wrapper {
    @apply w-full  lg:w-9/12 mx-auto;
}

.calendar {
  @apply flex justify-between p-0 lg:px-12 mb-4;
}

button {
  @apply flex items-center font-medium;
}

button span {
  @apply ml-2 self-center;
}

.date-picker-wrapper >>> input {
    display: none !important;
}

.date-picker-wrapper >>> .cell.selected {
    @apply !bg-yellow;
}

.date-picker-wrapper >>> .cell:not(.blank):not(.disabled):hover {
    @apply !border-yellow;
}
</style>
