<template>
  <div class="flex flex-col items-center">
    <img v-if="logoUrl" :src="logoUrl" class="rounded-full w-20 h-20" />
    <span class="mt-3">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    client: {
      required: true,
      type: Object
    }
  },
  computed: {
    name () {
      return this.client.fields.Name
    },
    logoUrl () {
      if (
        this.client.fields['Company Logo'] &&
        this.client.fields['Company Logo'].length
      ) {
        return this.client.fields['Company Logo'][0].thumbnails.large.url
      }

      return null
    }
  }
}
</script>
