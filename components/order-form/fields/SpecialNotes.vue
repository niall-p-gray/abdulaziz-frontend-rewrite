<template>
    <div class="form-group">
        <label>Special Notes</label>
        <textarea v-model="value" cols="30" @change="onChange" placeholder="Special Notes"></textarea>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.value)
    }
  }
}
</script>
