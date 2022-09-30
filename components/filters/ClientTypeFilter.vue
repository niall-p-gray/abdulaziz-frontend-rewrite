<template>
  <div class="wrapper">
    <span>Client Type(s)</span>
    <div class="options-wrapper">
      <button @click="toggleOptionsDropdown" class="toggle-dropdown-btn">
        <img class="w-6 h-6" src="~/assets/icons/filter.svg" >
      </button>
      <div :class="{'open': openOptionsDropdown}" class="options">
        <label class="option" @click="unselectAll">
          <input type="checkbox" :checked="!selectedOptions.length" disabled />
          <span class="text">All</span>
        </label>
        <label class="option" v-for="(option, index) in options" :key="index">
          <input type="checkbox" @change="toggle(option)" :checked="isSelected(option)" />
          <span class="text">{{ option.replace(/^[0-9]\./, '') }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedOptions: [],
      openOptionsDropdown: false
    }
  },
  methods: {
    toggle (option) {
      if (this.isSelected(option)) {
        this.selectedOptions = this.selectedOptions.filter(opt => opt !== option)
      } else {
        this.selectedOptions.push(option)
      }

      this.notify()
    },
    toggleOptionsDropdown () {
      this.openOptionsDropdown = !this.openOptionsDropdown
    },
    isSelected (option) {
      return this.selectedOptions.includes(option)
    },
    unselectAll () {
      this.selectedOptions = []
      this.notify()
    },
    notify () {
      this.$emit('input', this.selectedOptions)
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
.wrapper{
  @apply flex items-center justify-between;
}

.options-wrapper{
  @apply relative;
}

.options{
  @apply flex flex-col absolute p-2 bg-white z-10 hidden;
  top: 27px;
  left: -174px;
  min-width: 200px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.options.open{
  @apply flex;
}

.toggle-dropdown-btn {
  display: block;
}

.option{
  @apply text-sm ml-5 my-2;
}

.option .text{
  @apply text-sm ml-1 align-middle;
}

@media (min-width: 1024px) {
  .wrapper{
    @apply justify-start;
  }

  .options-wrapper{
    @apply flex items-center justify-center;
  }

  .options{
    @apply ml-4 block static p-0 shadow-none;
  }

  .option{
    @apply my-0;
  }

  .toggle-dropdown-btn {
    display: none;
  }
}
</style>
