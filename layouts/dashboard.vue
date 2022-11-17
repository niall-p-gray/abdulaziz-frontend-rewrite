<template>
  <div class="page">
    <div>
      <portal-target name="back-button"></portal-target>
      <BackButton v-if="shouldDefaultShowBackButton" />
      <div class="page-title-container">
        <h1 class="page-title">
          <portal-target name="page-title"></portal-target>
        </h1>
      </div>
    </div>
    <Nuxt class="mt-10"/>
    <notifications class="m-2"/>
  </div>
</template>

<script>
import { Wormhole } from 'portal-vue'
import BackButton from '@/components/BackButton'

export default {
  components: {
    BackButton
  },
  computed: {
    shouldDefaultShowBackButton () {
      // Don’t show the default back btn, unless the child component didn’t provide a button
      if (Wormhole.hasContentFor('back-button') || this.$route.name === 'index') {
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>
.page {
  @apply px-8 py-3 xl:px-40 xl:py-10;
}

.page-title-container {
  @apply text-center mt-16 xl:mt-8;
}

.page-title {
  @apply text-3xl lg:text-4xl font-medium;
}
</style>
