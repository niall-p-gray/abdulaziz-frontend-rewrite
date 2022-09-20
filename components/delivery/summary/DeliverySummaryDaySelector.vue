<template>
  <div class="wrapper">
    <div @click="goToPrevSlide" class="wrapper__slider__container__handle">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </div>
    <div class="wrapper__slider__container">
      <div ref="slider" :style="{'--slider-index': currentSlideIndex}" class="wrapper__slider__container__slider">
        <div
          @click="selectDay(day.num)"
          v-for="(day, index) in daysInMonth"
          :key="index"
          :class="{'!bg-yellow': day.num === currentDay}"
          class="wrapper__slider__container__slider_item"
        >
          {{ day.formattedDate }}
        </div>
      </div>
    </div>
    <div @click="goToNextSlide" class="wrapper__slider__container__handle">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      required: true
    }
  },
  data () {
    return {
      currentSlideIndex: 0
    }
  },
  computed: {
    daysInMonth () {
      let days = this.currentMonthTotalDays
      const dates = []

      while (days) {
        const currentDate = this.$moment(this.date, 'YYYY/MM/DD').date(days)

        dates.unshift({
          num: days,
          formattedDate: currentDate.format('ddd, D')
        })

        days--
      }

      return dates
    },
    currentDay () {
      return this.$moment(this.date, 'YYYY/MM/DD').date()
    },
    currentMonthTotalDays () {
      return this.$moment(this.date, 'YYYY/MM/DD').daysInMonth()
    },
    slidesCount () {
      const slider = document.querySelector('.wrapper__slider__container__slider')
      const itemsPerScreen = window.getComputedStyle(slider).getPropertyValue('--items-per-screen')

      return this.currentMonthTotalDays / itemsPerScreen
    }
  },
  methods: {
    selectDay (dayNum) {
      this.$emit('select', dayNum)
    },
    goToNextSlide () {
      if (this.currentSlideIndex >= this.slidesCount) {
        return
      }

      this.currentSlideIndex++
    },
    goToPrevSlide () {
      if (this.currentSlideIndex <= 0) {
        return
      }

      this.currentSlideIndex--
    }
  }
}
</script>

<style scoped>
.wrapper {
  @apply flex items-center mb-8;
}

.wrapper__slider__container {
  @apply w-8/12 flex-1 overflow-hidden;
}

.wrapper__slider__container__slider {
  --slider-index: 0;
  --items-per-screen: 3;
  @apply flex ;
  transform: translate(calc(var(--slider-index) * -100%));
  transition: transform 240ms ;
}

.wrapper__slider__container__slider_item {
  /* flex-basis: 11%; */
  width: calc(100% / var(--items-per-screen));
  height: 35px;
  background: #fffacc;
  @apply flex items-center justify-center rounded-lg ml-1 flex-shrink-0 flex-grow-0 font-normal cursor-pointer;
}

.wrapper__slider__container__handle {
  @apply text-sm cursor-pointer;
}

.wrapper__slider__container__handle:first-child {
  @apply mr-6;
}

.wrapper__slider__container__handle:last-child {
  @apply ml-6;
}

@media (min-width:600px) {
  .wrapper__slider__container__slider {
    --items-per-screen: 10;
  }
}
</style>
