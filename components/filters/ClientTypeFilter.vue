<template>
  <div class="wrapper">
    <span>Client Type(s)</span>
    <div class="options">
      <label class="option" v-for="(option, index) in options" :key="index">
        <input type="checkbox" @change="toggle(option)" :checked="isSelected(option)" />
        <span class="text">{{ option }}</span>
      </label>
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
      selectedOptions: []
    }
  },
  methods: {
    toggle (option) {
      if (this.isSelected(option)) {
        this.selectedOptions = this.selectedOptions.filter(opt => opt !== option)
      } else {
        this.selectedOptions.push(option)
      }

      this.$emit('input', this.selectedOptions)
      this.$emit('change')
    },
    isSelected (option) {
      return this.selectedOptions.includes(option)
    }
  }
}
</script>

<style scoped>
.wrapper{
  @apply flex items-center justify-center;
}

.options{
  @apply ml-4;
}

.option{
  @apply text-sm ml-5;
}

.option .text{
  @apply text-sm ml-1 align-middle;
}
</style>
