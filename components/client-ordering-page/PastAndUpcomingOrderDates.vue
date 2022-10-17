<template>
  <div class="past-and-upcoming-orders-tabs w-6/12 mx-auto">
    <div>
      <button :class="{'active': dates.past.includes(selectedDate)}">Past Orders</button>
      <ul>
        <li
          @click="select(date)"
          v-for="(date, index) in dates.past"
          :key="index"
          :class="{ active: date === selectedDate }"
        >
          {{ date }}
        </li>
      </ul>
    </div>
    <div class="ml-10">
      <button :class="{'active': dates.future.includes(selectedDate)}">Upcoming Orders</button>
      <ul>
        <li
          @click="select(date)"
          v-for="(date, index) in dates.future"
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
    this.selectedDate = this.dates.future[0] // Initially preselect the first upcoming date
  },
  methods: {
    select (date) {
      this.selectedDate = date
    }
  },
  computed: {
    dates () {
      const dates = {
        past: [],
        future: []
      }

      const today = this.$moment()
      const startDate = this.$moment().subtract(3, 'days')
      const endDate = this.$moment().add(4, 'days')
      // Loop through dates between start/end dates and push them
      // into dates.past/dates.future accordingly
      while (true) {
        if (startDate.isSameOrAfter(today)) {
          dates.future.push(startDate.format('MM/DD'))
        } else {
          dates.past.push(startDate.format('MM/DD'))
        }

        startDate.add(1, 'days')

        if (startDate.isSameOrAfter(endDate)) {
          break
        }
      }

      return dates
    }
  }
}
</script>

<style scoped>
.past-and-upcoming-orders-tabs {
  @apply flex justify-center;
}

button {
  padding: 10px;
  border-bottom: 2px #212322 solid;
  color: #212322;
  @apply text-center font-bold w-full;
}

button.active {
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
