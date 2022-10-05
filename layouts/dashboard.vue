<template>
  <div class="px-4 md:px-8 py-3 xl:px-40 xl:py-10 bg-bgColor">
    <div>
      <BackButton v-if="shouldShowBackButton" />
      <div class="text-center mt-6 xl:mt-2">
        <h1 class="text-4xl page-title font-medium">
          <portal-target name="page-title"></portal-target>
        </h1>
      </div>
    </div>
    <Nuxt class="mt-10"/>
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
