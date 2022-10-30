<template>
  <div>
    <button
    @click="push"
    :class="{'btn__disabled': pushing}"
    :disabled="pushing"
    class="btn">
      <span v-if="!pushing">Send To Production Planner Shee</span>
      <span v-else>Pushing...</span>
    </button>
    <p v-if="error" class="text-red-500 mt-1">Could not push selected data</p>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      pushing: false,
      error: false
    }
  },
  methods: {
    async push () {
      this.pushing = true
      this.error = false

      try {
        const options = {
          'Content-Type': 'application/json'
        }

        await this.$axios.post('/.netlify/functions/update-production-planner-sheet',
          this.payload,
          options
        )
      } catch (error) {
        console.error(error)
        this.error = true
      }

      this.pushing = false
    }
  }
}
</script>
