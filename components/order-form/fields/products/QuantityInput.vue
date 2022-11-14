<template>
  <div class="flex justify-center items-center">
    <span
      @click="decrement"
      class="text-lg mr-2 cursor-pointer text-sm text-red-500"
    >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-5 h-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    </span>
    <input
    type="text"
    v-model="qty"
    @change="onChange"
    @keypress="onInput" >
    <span
      @click="increment"
      class="text-lg ml-2 cursor-pointer text-sm text-green-500"
    >
        <svg xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </span>
    <img
    @click="clear"
    class="ml-6 w-5 cursor-pointer"
    src="~/assets/icons/trash.svg" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      qty: 0
    }
  },
  methods: {
    onInput (e) {
      // Accept digits only
      if (!(e.charCode >= 48 && e.charCode <= 57)) {
        e.preventDefault()
      }
    },
    onChange () {
      // Reset if the value is empty, negative or has a leading zero
      if (/^0/.test(this.qty) || /^-[0-9]*/.test(this.qty) || this.qty === '') {
        this.qty = 0
      }

      this.$emit('input', parseInt(this.qty))
      this.$emit('change')
    },
    increment () {
      this.qty++
      this.onChange()
    },
    decrement () {
      if (this.qty > 0) {
        this.qty--
        this.onChange()
      }
    },
    clear () {
      this.qty = 0
      this.onChange()
    }
  },
  watch: {
    value: {
      handler: function (newValue) {
        this.qty = newValue
        if (!this.qty) this.qty = 0
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 30px;
  padding: 2px;
  text-align: center;
  background: #fff;
}

input:focus {
  @apply bg-gray-100;
}

@media (min-width: 600px) {
  input {
    width: 35px;
  }
}
</style>
