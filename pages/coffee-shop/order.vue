<template>
  <div class="bg-primary min-h-screen title-text">
    <div class="container !pt-36 !w-9/12">
      <h1 class="text-3xl title-text">
        Niall - FOR TESTING <span class="text-4xl">NPG</span>
      </h1>
      <div class="w-1/2 mt-10 grid grid-cols-2 text-center mx-auto gap-3">
        <div class="">
          <div class="text-center border-b-red-500 border-b-2">
            <span class="text-red-500 text-lg title-text">Past Orders</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-center mx-auto justify-center mt-2 w-5/6">
            <div class="chip">
              <span>6/13</span>
            </div>
            <div class="chip">
              <span>6/20</span>
            </div>
            <div class="chip">
              <span>6/27</span>
            </div>
          </div>
        </div>
        <div class="">
          <div class="text-center border-b-red-500 border-b-2">
            <span class="text-red-500 text-lg title-text">Upcoming Orders</span>
          </div>
          <div class="grid grid-cols-4 gap-2 text-center mx-auto justify-center mt-2 w-5/6">
            <div class="chip">
              <span>7/14</span>
            </div>
            <div class="chip">
              <span>7/11</span>
            </div>
            <div class="chip">
              <span>7/18</span>
            </div>
            <div class="chip">
              <span>7/25</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <order-table :items="items" />
      </div>
      <div class="mt-10 w-1/2 mx-auto">
        <div class="grid-grid-cols-2 gap-5">
          <button class="btn btn__disabled mr-2">
            Save Order
          </button>
          <button class="btn ml-2">
            Make Standing Order
          </button>
        </div>
      </div>
      <div class="mt-10 rounded-xl bg-[#eeebcc] py-10 px-8">
        <h3 class="text-center text-2xl">
          Instructions
        </h3>
        <ul class="list-disc w-2/5 mx-auto">
          <li class="text-light">
            Enter the # of each kolache you want for each day
          </li>
          <li class="text-light">
            Click 'Save Orders' to update your upcoming orders
          </li>
          <li class="">
            <b>
              Click 'Save Orders' to update your upcoming orders
            </b>
          </li>
        </ul>
        <p class="mt-2 font-light italic text-gray-400">
          Note: Red fields mean that the ordering window has closed for that day - if you need to update it, please text or call us directly! 😊😊😊
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoffeeShopOrder',
  components: {
    OrderTable: () => import('@/components/orderPage/OrderTable')
  },
  data () {
    return {
      items: [
        {
          name: 'Coloradough',
          ingredients: [
            'Sausage',
            'egg',
            'cheddar',
            'onions',
            'peppers'
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
