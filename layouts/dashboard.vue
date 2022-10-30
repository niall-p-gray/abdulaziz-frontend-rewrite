<template>
  <div class="page">
    <div>
      <BackButton v-if="shouldShowBackButton" />
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
import BackButton from '@/components/BackButton'

export default {
  components: {
    BackButton
  },
  computed: {
    shouldShowBackButton () {
      if (this.$route.name !== 'index') {
        return true
      }

      return false
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
