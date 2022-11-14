<template>
  <div>
    <div class="flex gap-x-3 flex-wrap">
      <button @click="addOneBreakfast" class="btn btn__secondary">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-sm"/>
        <span>1 breakfast sample box</span>
      </button>
      <button @click="addOneAllDaySample" class="btn btn__secondary">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-sm"/>
        <span>1 all day sample box</span>
      </button>
      <button @click="addOneBreakfastDozen" class="btn btn__secondary">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-sm"/>
        <span>1 breakfast dozen</span>
      </button>
      <button @click="addOneDozenBreakfastVeg" class="btn btn__secondary">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-sm"/>
        <span>1 breakfast dozen (veg)</span>
      </button>
      <button @click="addOneDozenAllDay" class="btn btn__secondary">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-sm"/>
        <span>1 all day dozen</span>
      </button>
      <button @click="$emit('clear')" class="btn btn__secondary !border-red-500 !text-red-500 hover:!bg-white">
        clear all
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderEventName: 'add-default-order'
    }
  },
  methods: {
    addOneBreakfast () {
      this.$emit(this.orderEventName, {
        recOY2bEa5r9Uc5eS: 1,
        recZJBEonwaJ2UM3A: 1,
        recXXlj4tAZCp416B: 1,
        rec4f7tMSqSFtUsgH: 1
      })
    },
    addOneAllDaySample () {
      this.$emit(this.orderEventName, {
        recN8XcZMdE0aQjsc: 1,
        rec8NreCbCUwVnQgb: 1,
        rec8jnxepOczjpAsO: 1,
        rec5BhFPhXUEsISmi: 1
      })
    },
    addOneBreakfastDozen () {
      this.$emit(this.orderEventName, {
        recOY2bEa5r9Uc5eS: 3,
        recXXlj4tAZCp416B: 3,
        rec4f7tMSqSFtUsgH: 2,
        recvpRS22hhPag0IF: 2,
        recZJBEonwaJ2UM3A: 1,
        recJJKZq6OOBgdge1: 1
      })
    },
    addOneDozenBreakfastVeg  () {
      this.$emit(this.orderEventName, {
        recXXlj4tAZCp416B: 6,
        rec4f7tMSqSFtUsgH: 3,
        recvpRS22hhPag0IF: 3
      })
    },
    addOneDozenAllDay  () {
      this.$emit(this.orderEventName, {
        recN8XcZMdE0aQjsc: 3,
        rec8jnxepOczjpAsO: 3,
        rec5BhFPhXUEsISmi: 3,
        recvpRS22hhPag0IF: 3
      })
    }
  }
}
</script>

<style scoped>
button {
  @apply text-xs rounded-lg p-2 flex items-center border-gray-400 hover:bg-gray-100 mt-2;
}

span {
    @apply ml-2;
}
</style>
