<template>
    <div class="form-group">
        <label>Special Notes</label>
        <textarea v-model="value" cols="30" @change="onChange" placeholder="Special Notes"></textarea>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      value: null
    }
  },
  computed: {
    ...mapGetters({
      fields: 'order-form/fields'
    })
  },
  methods: {
    ...mapActions({
      updateFields: 'order-form/updateFields'
    }),
    onChange () {
      this.updateFields({
        specialNotes: this.value
      })
    }
  },
  mounted () {
    if (this.fields.specialNotes) this.value = this.fields.specialNotes
  }
}
</script>
