<template>
  <div class="week-selector">
    <div class="tabs-container">
      <div class="tab">
        <div
        @click="switchTab('past-weeks')"
        :class="{'active': selectedTab == 'past-weeks'}"
        class="title">Past Orders</div>
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
      <div class="tab">
        <div
        @click="switchTab('upcoming-weeks')"
        :class="{'active': selectedTab == 'upcoming-weeks'}"
        class="title">
          Upcoming Orders
        </div>
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
    <ul class="mobile-options">
      <li
        @click="select(date)"
        v-for="(date, index) in selectedTabWeeks"
        :key="index"
        :class="{ active: date === selectedDate }"
      >
        {{ date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: null,
      selectedTab: null
    }
  },
  mounted () {
    // Initially preselect the first upcoming week
    this.selectedTab = 'upcoming-weeks'
    this.selectedDate = this.weeks.future[0]
  },
  methods: {
    select (date) {
      this.selectedDate = date

      if (this.weeks.future.includes(date)) {
        this.selectedTab = 'upcoming-weeks'
      } else {
        this.selectedTab = 'past-weeks'
      }

      this.$emit('input', this.$moment(date, 'MM/DD').format('DD-MM-YYYY'))
    },
    switchTab (targetTab) {
      // This can only be called on small devices
      if (process.client && screen.width > 1024) {
        return
      }

      this.selectedTab = targetTab

      if (this.selectedTab === 'upcoming-weeks') {
        this.selectedDate = this.weeks.future[0]
      } else {
        this.selectedDate = this.weeks.past[0]
      }
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
    },
    selectedTabWeeks () {
      if (this.selectedTab === 'upcoming-weeks') {
        return this.weeks.future
      } else {
        return this.weeks.past
      }
    }
  }
}
</script>

<style scoped>
.tabs-container {
  @apply flex justify-between w-full lg:mx-auto;
}

.tab {
  @apply w-full;
}

.title {
  padding: 10px;
  border-bottom: 1px #d3d3d3 solid;
  color: #212322;
  @apply text-center font-bold w-full cursor-pointer;
}

.title.active {
  border-bottom: 2px #e56a54 solid;
  color: #e56a54;
}

ul {
  @apply mt-4 flex justify-center w-auto hidden;
}

ul.mobile-options {
  @apply !flex;
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

@media (min-width: 1024px) {
  .tabs-container {
    @apply flex justify-center w-6/12 mx-auto;
  }

  .tabs-container ul {
    @apply flex;
  }

  .tab {
    @apply w-auto;
  }

  .tab:nth-child(2) {
    @apply ml-4 lg:ml-10;
  }

  .title {
    border-bottom: 2px #212322 solid;
    cursor: default;
  }

  ul.mobile-options {
    @apply !hidden;
  }
}
</style>
