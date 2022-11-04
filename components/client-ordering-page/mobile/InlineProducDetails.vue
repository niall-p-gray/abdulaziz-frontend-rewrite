<template>
  <div class="item">
    <div class="icon">
      <img v-if="product.logo" :src="product.logo" />
    </div>
    <strong ref="title" class="title">{{ product.name }}</strong>
    <DailyOrderQuantityInput
      v-if="selectedday && product.weekDayOrders[selectedday]"
      :qty="product.weekDayOrders[selectedday].qty"
      :day="selectedday"
      :product="product"
      :show-buttons="true"
    />
    <div v-if="showDescription" ref="description" class="description">{{ product.description }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DailyOrderQuantityInput from '@/components/client-ordering-page/DailyOrderQuantityInput'

export default {
  components: {
    DailyOrderQuantityInput
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDescription: false
    }
  },
  computed: {
    ...mapGetters({
      selectedWeek: 'weekly-client-orders/selectedWeek',
      selectedday: 'weekly-client-orders/selectedDay'
    })
  },
  methods: {
    handleDescriptionVisibility (e) {
      if (e.target === this.$refs.title || e.target === this.$refs.description) {
        this.showDescription = true
      } else {
        this.showDescription = false
      }
    }
  },
  mounted () {
    window.addEventListener('click', this.handleDescriptionVisibility)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.handleDescriptionVisibility)
  }
}
</script>

<style scoped>
.item {
  @apply flex items-center justify-between py-3 border-y border-gray-300 relative;
}

.icon {
  @apply rounded-full w-7 h-7 bg-gray-200 text-sm;
}

.title {
  @apply ml-2 underline flex-1;
}

.description{
  position: absolute;
  top: 45px;
  left: 33px;
  border-radius: 10px;
  width: 275px;
  height: 111px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background: #fff;
  padding: 10px;
  z-index: 5;
}
</style>
