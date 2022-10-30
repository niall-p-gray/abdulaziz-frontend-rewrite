<template>
  <ul>
    <li
      @click="select(index + 1)"
      v-for="(day, index) in weekDayNames"
      :key="index"
      :class="{ selected: isSelected(index + 1) }"
      class="chip"
    >
      {{ day }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { weekDayNames } from '@/utils'

export default {
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      format: 'DD-MM-YYYY'
    }
  },
  mounted () {
    this.setCurrentWeekdayAsSelected()
  },
  computed: {
    ...mapGetters({
      week: 'weekly-client-orders/selectedWeek'
    }),
    weekDayNames () {
      return weekDayNames().map(name => name.substring(0, 2))
    },
    selectedWeek () {
      return this.$moment(this.week, this.format)
    },
    selectedDay () {
      return this.$moment(this.value, this.format)
    }
  },
  methods: {
    select (weekdayNum) {
      const date = this.selectedWeek.isoWeekday(weekdayNum).format(this.format)
      this.$emit('input', date)
    },
    isSelected (weekdayNum) {
      return this.selectedDay.isoWeekday() === weekdayNum
    },
    setCurrentWeekdayAsSelected () {
      const newWeekDay = this.selectedWeek.isoWeekday()
      this.select(newWeekDay)
    }
  },
  watch: {
    week: {
      handler: function () {
        this.setCurrentWeekdayAsSelected()
      }
    }
  }
}
</script>
<style scoped>
ul {
  @apply flex justify-between;
}

.chip {
  @apply text-sm;
  min-width: 42px;
}
</style>
