<template>
  <div class="flex justify-end md:justify-start items-center md:items-start m-0 mt-6">
    <button @click="$emit('clear')" class="clear-btn text-red-500">
      clear all
    </button>
    <div class="dropdown ml-4 md:ml-0">
      <button @click="openDropDown = true" class="toggle-dropdown-btn underline">
        Quick entry
      </button>
      <div :class="{'open': openDropDown}"  class="options">
        <button @click="addOneBreakfast" class="btn btn__secondary">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xs"/>
          <span>1 breakfast sample box</span>
        </button>
        <button @click="addOneAllDaySample" class="btn btn__secondary">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xs"/>
          <span>1 all day sample box</span>
        </button>
        <button @click="addOneBreakfastDozen" class="btn btn__secondary">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xs"/>
          <span>1 breakfast dozen</span>
        </button>
        <button @click="addOneDozenBreakfastVeg" class="btn btn__secondary">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xs"/>
          <span>1 breakfast dozen (veg)</span>
        </button>
        <button @click="addOneDozenAllDay" class="btn btn__secondary">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-xs"/>
          <span>1 all day dozen</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderEventName: 'add-default-order',
      openDropDown: false
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
  },
  mounted () {
    window.addEventListener('click', (e) => {
      if (e.target.matches('.toggle-dropdown-btn')) return
      if (e.target.closest('.toggle-dropdown-btn')) return

      this.openDropDown = false
    })
  }
}
</script>

<style scoped>
.options button {
  @apply text-xs p-2 flex items-center mt-2 border-0;
}

.dropdown {
  position: relative;
}

.options{
  @apply flex flex-col absolute p-2 bg-white z-10 hidden;
  top: 27px;
  left: -117px;
  min-width: 200px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.options.open{
  @apply flex;
}

.toggle-dropdown-btn {
  display: block;
}

@media (min-width: 768px) {
  .dropdown {
    
  }

  .options{
    @apply flex flex-row flex-wrap static p-0 m-0 shadow-none order-1;
  }

  .options button {
    @apply border border-gray-400 text-sm mr-2 mt-0 mb-2 p-1;
  }

  .toggle-dropdown-btn {
    display: none;
  }

  .clear-btn {
    min-width: 63px;
    order: 2;
  }
}

</style>
