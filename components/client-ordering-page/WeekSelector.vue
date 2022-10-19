<template>
  <div class="week-selector">
    <div>
      <div :class="{'active': weeks.past.includes(selectedDate)}" class="title">Past Orders</div>
      <ul>
        <li
          @click="select(date)"
          v-for="(date, index) in weeks.past"
          :key="index"
          :class="{ active: date === selectedDate }"
        >
          {{ date }}
        </li>
      </ul>
    </div>
    <div class="ml-10">
      <div :class="{'active': weeks.future.includes(selectedDate)}" class="title">Upcoming Orders</div>
      <ul>
        <li
          @click="select(date)"
          v-for="(date, index) in weeks.future"
          :key="index"
          :class="{ active: date === selectedDate }"
        >
          {{ date }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: null
    }
  },
  mounted () {
    this.selectedDate = this.weeks.future[0] // Initially preselect the first upcoming week
  },
  methods: {
    select (date) {
      this.selectedDate = date

      this.$emit('input', this.$moment(date, 'MM/DD').format('DD-MM-YYYY'))
    }
  },
  computed: {
    weeks () {
      // We need to get last 3 weeks, and 4 upcoming weeks (including current week)
      const weeks = {
        past: [],
        future: []
      }

      const currentWeek = this.$moment().startOf('isoWeek')
      const firstWeek = this.$moment().subtract(3, 'weeks').startOf('isoWeek')
      const lastWeek = this.$moment().add(4, 'weeks').startOf('isoWeek')
      // Loop through weeks between first/last weeks and push them
      // into weeks.past/weeks.future accordingly
      while (true) {
        if (firstWeek.isSameOrAfter(currentWeek)) {
          weeks.future.push(firstWeek.format('MM/DD'))
        } else {
          weeks.past.push(firstWeek.format('MM/DD'))
        }

        firstWeek.add(1, 'weeks')

        if (firstWeek.isSameOrAfter(lastWeek)) {
          break
        }
      }

      return weeks
    }
  }
}
</script>

<style scoped>
.week-selector {
  @apply flex justify-center w-6/12 mx-auto;
}

.title {
  padding: 10px;
  border-bottom: 2px #212322 solid;
  color: #212322;
  @apply text-center font-bold w-full;
}

.title.active {
  border-color: #e56a54;
  color: #e56a54;
}

ul {
  @apply mt-4 flex justify-center w-auto;
}

ul li {
  width: 55px;
  @apply flex justify-center items-center rounded-lg py-2 ml-1 cursor-pointer;
  background: #fffacc;
  transition: background 0.25s;
}

ul li:hover,
ul li.active {
  @apply !bg-yellow;
}
</style>
