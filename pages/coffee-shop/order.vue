<template>
  <div class="bg-primary min-h-screen title-text">
    <div class="container !pt-36 !w-9/12">
      <h1 class="text-3xl title-text">
        Howdy Kolache Links
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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-white border-b-2 border-gray-200 ">
              <tr class="text-light">
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200 text-center">
                  ITEM
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  MON
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  TUE
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  WED
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  THU
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  FRI
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  SAT
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  SUN
                </th>
                <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    Coloradough
                  </p>
                  <p class="font-light">
                    Sausage, egg, cheddar, onions, peppers
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    Ron Swanson
                  </p>
                  <p class="font-light">
                    Bacon, egg, jalapeño
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    El Greco
                  </p>
                  <p class="font-light">
                    Spinach, egg, feta
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    Desayuno
                  </p>
                  <p class="font-light">
                    Chorizo, egg, Chihuahua cheese
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    Hammy Sammy
                  </p>
                  <p class="font-light">
                    Ham, Swiss cheese, stoneground mustard
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    K.R.E.A.M.
                  </p>
                  <p class="font-light">
                    Cream cheese, lemon zest
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
                  <p class="font-semibold text-black">
                    The Schmear
                  </p>
                  <p class="font-light">
                    Everything bagel & cream cheese
                  </p>
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
                <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
                  <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
                </td>
              </tr>
              <tr class="bg-white border-b">
                <td class=" px-4 py-2" colspan="7">
                  <span class="text-gray-400 font-light">
                    Last Edited: 7/7 12:17
                  </span>
                </td>
                <td class=" px-4 py-2 text-center">
                  <span class="text-gray-700 font-light text-lg">
                    Totals:
                  </span>
                </td>
                <td class=" px-4 py-2 text-center">
                  <span class="text-gray-900 font-semibold">
                    38
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  name: 'CoffeeShopOrder'
}
</script>

<style>

</style>
