<template>
  <nuxt-link :to="to">
    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-xs" />
    <span>{{ label }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      default: '/'
    },
    label: {
      default: 'Back to main'
    }
  }
}
</script>
